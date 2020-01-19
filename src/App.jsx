import React, {Component} from "react"
import Collapsible from 'react-collapsible';
import SubjectTile from "./SubjectTile";
import "./style.css"
import Axios from "axios";
import LevelTile from "./LevelTile.jsx";
import ShameTile from "./ShameTile"



class App extends Component {

    constructor() {
        super();
        this.state = {
            chartsLoading: true,
            shameLoading:true,
            levelsLoading:true
        };
    }

    async componentDidMount() {
        let token = 'c456bd21-adcc-4b74-956f-22d4785633c7';
        let requestHeaders =
            {
                headers: {'Authorization': 'Bearer ' + token}
            };
        let shameBuff = [];
        let level = [];
        let levelBuff=[];

        let userStats =await Axios.get('https://api.wanikani.com/v2/user',requestHeaders).then(function (res) {
            let userStats = {user:null, level:0};
            userStats.user = res.data.data.user;
            userStats.level = res.data.data.level;
            return userStats;
        });
        let lvls = [];
        if(userStats.level === 1 || userStats.level === 2 )
        {
            lvls = [1,2]
        }
        else
        {
            lvls = [userStats.level-1,userStats.level,userStats.level+1]
        }
        let progress = [];


        for(let i = 0; i < lvls.length;i++)
            {
                let stats = await Axios.all([
                    Axios.get('https://api.wanikani.com/v2/assignments?levels=' + lvls[i] + "&passed=true&subject_types=radical" ,requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/assignments?levels=' + lvls[i] + "&passed=true&subject_types=kanji",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/assignments?levels=' + lvls[i] + "&passed=true&subject_types=vocabulary",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/subjects?levels=' + lvls[i] +"&types=radical",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/subjects?levels=' + lvls[i] +"&types=kanji",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/subjects?levels=' + lvls[i] +"&types=vocabulary",requestHeaders)])
                    .then(Axios.spread(function (passRad, passKan, passVoc, subRad,subKan,subVoc) {
                    return [passRad.data,passKan.data,passVoc.data,subRad.data,subKan.data,subVoc.data]
                }));

                progress.push([(100*stats[2].total_count/stats[5].total_count).toFixed(0),(100*stats[1].total_count/stats[4].total_count).toFixed(0),(100*stats[0].total_count/stats[3].total_count).toFixed(0)])
            }

        let pBuff = [];
        for(let i = 0; i < lvls.length;i++)
        {
            pBuff.push(<LevelTile  level={lvls[i]} progData={progress[i]}/>)
        }

        this.setState({
            charts:pBuff,
            chartsLoading:false});


        let data =  await Axios.get('https://api.wanikani.com/v2/review_statistics?percentages_less_than=55',requestHeaders).then(function(res) {
            let promises = [];
            for(let i = 0; i < res.data.total_count;i++)
            {
                promises.push(Axios.get('https://api.wanikani.com/v2/subjects?ids=' + res.data.data[i].data.subject_id,requestHeaders));
            }
            return promises;
        });

        shameBuff = await Axios.all(data).then(Axios.spread((...args) => {
            let buffer= [];
            for (let i = 0; i < args.length; i++) {
                buffer.push(
                <ShameTile data={args[i].data.data[0]}/>);
            }

            return buffer;
        }));



        this.setState({buffer:shameBuff,
            shameLoading:false});


        for(let i = 1; i <= userStats.level;i++) {
            levelBuff = [];
            let subjects = await Axios.get('https://api.wanikani.com/v2/subjects?levels=' + i, requestHeaders).then(function (res) {
                return res.data.data;
            });

            for(let i = 0; i < subjects.length;i++)
            {
                levelBuff.push(<SubjectTile data={subjects[i]}/>);
            }
            level.push(
                <span><Collapsible classParentString={"itemTile"} trigger={`level: ${i}`} triggerTagName={"div"}>
                <div className="container">
                {levelBuff}
                </div>
                </Collapsible></span>)
        }

        this.setState({
            buffer2:level,
        levelsLoading:false});
    }

    render() {
        const text = this.state.shameLoading ? "loading Shame..." :`Wall of shame(<55%):`;
        const text2 = this.state.levelsLoading ? "loading Levels ..." :`levels:`;
        const text3 = this.state.chartsLoading ? "loading... Level Stats" :``;
        return (
            <div>
                <div className="mainColl">
                    <div className="container">
                        {text3}
                    {this.state.charts}
                    </div>
                </div>
            <Collapsible classParentString={"mainColl"} trigger={text}  triggerTagName={"div"} >
            {

                this.state.buffer

            }
            </Collapsible>

            <Collapsible classParentString={"mainColl"} trigger={text2}  triggerTagName={"div"} >
            {
                this.state.buffer2
            }
            </Collapsible>
            </div>
    )
    }
}

export default App
