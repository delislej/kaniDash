import React, {Component} from "react"
import Collapsible from 'react-collapsible';
import Subject from "./Subject";
import SubjectTile from "./SubjectTile";
import "./style.css"
import kaniFetch from "./kaniFetch";
import Chart from 'react-apexcharts'


class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            series: [44, 55, 67],
            options: {
                chart: {
                    height: 150,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                fontSize: '22px',
                            },
                            value: {
                                fontSize: '16px',
                            },
                            total: {
                                show: true,
                                label: 'Level',
                                formatter: function (w) {
                                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                    return 1
                                }
                            }
                        }
                    }
                },
                labels: ['Vocab', 'Kanji', 'Radical'],
            },


        };



    }

    async componentDidMount() {
        let shameBuff = [];
        let level = [];
        let levelBuff=[];
        let ep1 = 'review_statistics?percentages_less_than=55';
        let ep2 = 'subjects?ids=';
        let token = 'c456bd21-adcc-4b74-956f-22d4785633c7';
        this.setState({loading: true
        });

        let userStats =await kaniFetch("user",token).then(function (res) {
            let userStats = {user:null, level:0};
            userStats.user = res.data.user;
            userStats.level = res.data.level;
            return userStats;
        });


        let data =  await kaniFetch(ep1,token).then(function(res) {

            for(let i = 0; i < res.total_count;i++)
            {

                if( i%15===0)
                {
                    setTimeout(null,3000)
                }
                kaniFetch(ep2+res.data[i].data.subject_id,token).then(function (res) {
                    console.log(res);
                    shameBuff.push(Subject(res))

                })
            }
            return shameBuff;
        });
        for(let i = 1; i <= userStats.level;i++) {
            levelBuff = [];
            //console.log(`level` + i);
            let subjects = await kaniFetch('subjects?levels=' + i, token).then(function (res) {
                return res.data;
            });

            for(let i = 0; i < subjects.length;i++)
            {
                console.log(subjects[i]);
                levelBuff.push(<SubjectTile data={subjects[i]}/>);
            }
            level.push(<Collapsible classParentString={"levelTile"} trigger={`level: ${i}`}>
        <div className="container">
                {levelBuff}
                </div>

                </Collapsible>)


        }

        this.setState({buffer:data,
            buffer2:level});

        this.setState({buffer:data,
            loading:false});
    }




    render() {
        const text = this.state.loading ? "loading..." :`Wall of shame(55%>):`;
        const text2 = this.state.loading ? "loading..." :`levels:`;
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="radialBar" width={200} height={300} />
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
