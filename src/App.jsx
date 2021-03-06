import React, {Component} from "react"
import SubjectTile from "./SubjectTile";
import TotalsBar from "./TotalsBar"
import "./style.css"
import Axios from "axios";
import LevelTile from "./LevelTile.jsx";
import ShameTile from "./ShameTile"
import {ControlLabel, Form, FormControl, FormGroup, HelpBlock, Navbar} from 'rsuite';
import {Panel} from 'rsuite';
import {PanelGroup} from 'rsuite';
import {Nav} from 'rsuite';
import { Modal } from 'rsuite';
import {Button} from 'rsuite';
import {Icon} from 'rsuite';

import "rsuite/dist/styles/rsuite-dark.css"



class App extends Component {

    constructor() {
        super();



        this.state = {
            subSRSMap: [],
            token: '',
            chartsLoading: true,
            shameLoading:true,
            levelsLoading:true,
            show: false
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    close() {
        this.setState({
            show: false
        });
    }


    submit = () => {
        this.setState({
            token: this.state.apiCheck
        }, this.fetchData);
        this.close();


    };




    open(size) {
        this.setState({
            size,
            show: true
        });
    }

    handleChange(event) {
        this.setState({
            apiCheck: event
        });
    }



    async fetchData() {





        let requestHeaders =
            {
                headers: {'Authorization': 'Bearer ' + this.state.token}
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
        console.log(userStats.level);
        if(userStats.level === 1 || userStats.level === 2 )
        {
            lvls = [1,2]
        }
        else
        {

            lvls = [userStats.level-2,userStats.level-1,userStats.level]
            console.log(lvls);
        }
        let progress = [];
        let assignmentsHolder=[];
        let srsData=[];
        srsData[0]=0;
        srsData[1]=0;
        srsData[2]=0;
        srsData[3]=0;
        srsData[4]=0;

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
                Axios.get('https://api.wanikani.com/v2/subjects?levels=' + lvls[i] +"&types=vocabulary",requestHeaders),
                Axios.get('https://api.wanikani.com/v2/assignments?levels=' + lvls[i],requestHeaders),])
                .then(Axios.spread(function (passRad, passKan, passVoc, subRad,subKan,subVoc,srsStats) {
                    return [passRad.data,passKan.data,passVoc.data,subRad.data,subKan.data,subVoc.data,srsStats]
                }));

            assignmentsHolder.push(stats[6].data);


            progress.push([(100*stats[2].total_count/stats[5].total_count).toFixed(0),
                (100*stats[1].total_count/stats[4].total_count).toFixed(0),
                (100*stats[0].total_count/stats[3].total_count).toFixed(0)])
        }
        let subSRSData = [];


        for(let i =0; i < assignmentsHolder.length; i++) {
            for (let j = 0; j < assignmentsHolder[i].data.length; j++) {
                subSRSData[assignmentsHolder[i].data[j].data.subject_id]=assignmentsHolder[i].data[j].data.srs_stage;
                switch(assignmentsHolder[i].data[j].data.srs_stage) {
                    case 1:
                        srsData[0]++;
                        break;
                    case 2:
                        srsData[0]++;
                        break;
                    case 3:
                        srsData[0]++;
                        break;
                    case 4:
                        srsData[0]++;
                        break;
                    case 5:
                        srsData[1]++;
                        break;
                    case 6:
                        srsData[1]++;
                        break;
                    case 7:
                        srsData[2]++;
                        break;
                    case 8:
                        srsData[3]++;
                        break;
                    case 9:
                        srsData[4]++;
                        break;
                    default:

                }

            }
        }

        let totalData=[<TotalsBar data={srsData}/>];

        let pBuff = [<LevelTile key={1337}  level={lvls} progData={progress} stageCount={srsData}/>];




        this.setState({
            charts:pBuff,
            tData:totalData,
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
                levelBuff.push(<SubjectTile key={2000+i} srsData={subSRSData[subjects[i].id]} data={subjects[i]}/>);
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
    async componentDidMount() {

        this.fetchData();
    }

    render() {
        if (this.state.token !== "") {


            const text = this.state.shameLoading ? "loading Shame..." : `Wall of shame(<55%):`;
            const text2 = this.state.levelsLoading ? "loading Levels ..." : `levels:`;
            const text3 = this.state.chartsLoading ? "loading... Level Stats" : ``;

            return (
                <div key={99999}>

                    <Modal size={"sm"}  show={this.state.show} onHide={this.close}>

                        <Modal.Body style={{width: '80%'}}>
                            <Form id="settings">
                                <FormGroup>
                                    <ControlLabel>API v2 Key</ControlLabel>
                                    <FormControl name="API v2 Key" onChange={this.handleChange.bind(this)}/>
                                    <HelpBlock>Required</HelpBlock>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer style={{width: '80%'}}>
                            <Button onClick={this.submit}>
                                Save Settings
                            </Button>

                        </Modal.Footer>
                    </Modal>
                    <Navbar>

                        <Navbar.Header>

                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" className="navbar-brand logo">Kanidash</a>
                        </Navbar.Header>
                        <Navbar.Body>
                            <Nav pullRight>
                                <Nav.Item onClick={() => this.open('md')} icon={<Icon icon="cog"/>}>Settings</Nav.Item>
                            </Nav>
                        </Navbar.Body>
                    </Navbar>


                    <div className="chartContainer">
                        {text3}

                        {this.state.charts}

                    </div>

                    <PanelGroup key={34567} bordered>
                        <Panel key={34568} >
                            {this.state.tData}


                        </Panel>
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
        else
        {
            return( <div key={99999}>

                    <Modal size={this.state.size} show={this.state.show} onHide={this.close}>
                        <Modal.Header>
                        </Modal.Header>
                        <Modal.Body>
                            <Form id="settings">
                                <FormGroup>
                                    <ControlLabel>API v2 Key</ControlLabel>
                                    <FormControl name="API v2 Key" onChange={this.handleChange.bind(this)}/>
                                    <HelpBlock>Required</HelpBlock>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.submit}>
                                Save Settings
                            </Button>

                        </Modal.Footer>
                    </Modal>
                    <Navbar>

                        <Navbar.Header>

                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" className="navbar-brand logo">Kanidash</a>
                        </Navbar.Header>
                        <Navbar.Body>
                            <Nav pullRight>
                                <Nav.Item onClick={() => this.open('md')} icon={<Icon icon="cog"/>}>Settings</Nav.Item>
                            </Nav>
                        </Navbar.Body>
                    </Navbar>


                    <h3>Please enter a valid API key in settings!<br/>
                    or test using this one "c456bd21-adcc-4b74-956f-22d4785633c7"
                    </h3>


                </div>
            )
        }
    }
}

export default App
