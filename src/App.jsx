import React, {Component} from "react"
import Collapsible from 'react-collapsible';
import SubjectTile from "./SubjectTile";
import "./style.css"
import kaniFetch from "./kaniFetch";
import LevelTile from "./LevelTile.jsx";


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
        let shameBuff = [];
        let level = [];
        let levelBuff=[];
        let ep1 = 'review_statistics?percentages_less_than=55';
        let ep2 = 'subjects?ids=';
        let progEp ='assignments?';
        let token = 'c456bd21-adcc-4b74-956f-22d4785633c7';

        let userStats =await kaniFetch("user",token).then(function (res) {
            let userStats = {user:null, level:0};
            userStats.user = res.data.user;
            userStats.level = res.data.level;
            return userStats;
        });
        let lvls = [];
        if(userStats.level === 0)
        {
            lvls = [0,1]
        }
        else
        {
            lvls = [userStats.level-1,userStats.level,userStats.level+1]
        }
        let progress = [];
        for(let i = 0; i < lvls.length;i++)
            {
                let passRad =await kaniFetch(progEp+"levels=" + lvls[i] + "&passed=true&subject_types=radical ",token).then(function (res) {
                    return res;
                });

                let passKan =await kaniFetch(progEp+"levels=" + lvls[i] + "&passed=true&subject_types=kanji",token).then(function (res) {
                    return res;
                });

                let passVoc =await kaniFetch(progEp+"levels=" + lvls[i] + "&passed=true&subject_types=vocabulary",token).then(function (res) {
                    return res;
                });
                let subRad =await kaniFetch("subjects?levels=" + lvls[i] +"&types=radical",token).then(function (res) {
                    return res;
                });
                let subKan =await kaniFetch("subjects?levels=" + lvls[i] +"&types=kanji",token).then(function (res) {
                    return res;
                });
                let subVoc =await kaniFetch("subjects?levels=" + lvls[i] +"&types=vocabulary",token).then(function (res) {
                    return res;
                });

                progress.push([(100*passVoc.total_count/subVoc.total_count).toFixed(0),(100*passKan.total_count/subKan.total_count).toFixed(0),(100*passRad.total_count/subRad.total_count).toFixed(0)])
            }

        let pBuff = [];
        for(let i = 0; i < lvls.length;i++)
        {
            pBuff.push(<LevelTile  level={lvls[i]} progData={progress[i]}/>)
        }

        this.setState({
            charts:pBuff,
            chartsLoading:false});


        let data =  await kaniFetch(ep1,token).then(function(res) {

            for(let i = 0; i < res.total_count;i++)
            {
                if( i%15===0)
                {
                    setTimeout(null,3000)
                }
                kaniFetch(ep2+res.data[i].data.subject_id,token).then(function (res) {
                    console.log(res.data[0]);
                    shameBuff.push(<SubjectTile data={res.data[0]}/>)

                })
            }
            return shameBuff;
        });


        this.setState({buffer:data,
            shameLoading:false});


        for(let i = 1; i <= userStats.level;i++) {
            levelBuff = [];
            let subjects = await kaniFetch('subjects?levels=' + i, token).then(function (res) {
                return res.data;
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
        const text = this.state.shameLoading ? "loading..." :`Wall of shame(55%>):`;
        const text2 = this.state.levelsLoading ? "loading..." :`levels:`;
        const text3 = this.state.chartsLoading ? "loading..." :``;
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
