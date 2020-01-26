import React, {Component} from "react"
import SubjectTile from "./SubjectTile";
import "./style.css"
import Axios from "axios";
import LevelTile from "./LevelTile.jsx";
import ShameTile from "./ShameTile"
import { Navbar } from 'rsuite';
import {Panel} from 'rsuite';
import {PanelGroup} from 'rsuite';
import {Nav} from 'rsuite';


import {Icon} from 'rsuite';
import "rsuite/dist/styles/rsuite-dark.css"



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
                    Axios.get('https://api.wanikani.com/v2/assignments?levels=' + lvls[i] +
                        "&passed=true&subject_types=radical" ,requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/assignments?levels=' + lvls[i] +
                        "&passed=true&subject_types=kanji",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/assignments?levels=' + lvls[i] +
                        "&passed=true&subject_types=vocabulary",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/subjects?levels=' + lvls[i] +"&types=radical",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/subjects?levels=' + lvls[i] +"&types=kanji",requestHeaders),
                    Axios.get('https://api.wanikani.com/v2/subjects?levels=' + lvls[i] +"&types=vocabulary",requestHeaders)])
                    .then(Axios.spread(function (passRad, passKan, passVoc, subRad,subKan,subVoc) {
                    return [passRad.data,passKan.data,passVoc.data,subRad.data,subKan.data,subVoc.data]
                }));

                progress.push([(100*stats[2].total_count/stats[5].total_count).toFixed(0),
                    (100*stats[1].total_count/stats[4].total_count).toFixed(0),
                    (100*stats[0].total_count/stats[3].total_count).toFixed(0)])
            }

        let pBuff = [];
            pBuff.push(
                <LevelTile key={1337}  level={lvls} progData={progress}/>
            );

            //console.log(storeProg);


        this.setState({
            charts:pBuff,
            chartsLoading:false});


        let data =  await Axios.get('https://api.wanikani.com/v2/review_statistics?percentages_less_than=55',requestHeaders)
            .then(function(res) {
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
                <ShameTile key={3000+i} data={args[i].data.data[0]}/>);
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
                levelBuff.push(<SubjectTile key={2000+i} data={subjects[i]}/>);
            }

            level.push(
                <span key={9632+i}><Panel collapsible bordered header={`level: ${i}`} style={{ margin:"10px", backgroundColor:"#005566"}}>
                <div >
                {levelBuff}
                </div>
                </Panel></span>)
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
            <div key={99999}>
                <Navbar>

                    <Navbar.Header>

                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="navbar-brand logo">Kanidash</a>
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight>
                            <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
                        </Nav>
                    </Navbar.Body>
                </Navbar>


                    <div>
                        {text3}

                    {this.state.charts}

                    </div>

                <PanelGroup key={34567}  bordered>
                    <Panel key={34568} collapsible header={text}>
                        {this.state.buffer}


                    </Panel>

                    <Panel collapsible header={text2}>

                        {
                            this.state.buffer2
                        }

                    </Panel>
                </PanelGroup>
            </div>
    )
    }
}

export default App
