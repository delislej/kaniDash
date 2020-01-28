import React, {Component} from 'react';
import Chart from "react-apexcharts";
import "./style.css"
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';


class LevelTile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            stageCount:this.props.stageCount,
            curLvl:0,
            labelLvl:1,
            data:props.progData,
            series: [44, 55, 67],
            options: {
                chart: {
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                fontSize: '11px',
                            },
                            value: {
                                fontSize: '8px',
                            },
                            total: {
                                show: true,
                                label: 'Level',
                                formatter: function (w) {
                                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                    return w.level
                                }
                            }
                        }
                    }
                },
                labels: ['Vocab', 'Kanji', 'Radical'],
            }
        }
    }

    right = () => {
        if(this.state.curLvl+1 > this.props.level.length-1)
        {

        }
        else
        {
            let newLvl = this.state.curLvl;
            let newLablLevel = this.state.labelLvl;
            newLablLevel++;
            newLvl++;
            this.setState({
                curLvl: newLvl,
                labelLvl: newLablLevel
            }, this.updateChart);
        }

    };

   left = () => {
       if(this.state.curLvl === 0)
       {

       }
       else {
           let newLvl = this.state.curLvl;
           let newLablLevel = this.state.labelLvl;
           newLablLevel--;
           newLvl--;
           this.setState({
               curLvl: newLvl,
               labelLvl: newLablLevel
           }, this.updateChart);
       }


    };

    updateChart = () => {

        let chartBuffer = [];

        let x = {
            chart: {
                height: "100",
                width:"50px",
                type: 'radialBar'
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '11px',
                        },
                        value: {
                            fontSize: '8px',
                        },
                        total: {
                            show: true,
                            label: this.state.labelLvl,
                            formatter: function (w) {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return "";
                            }
                        }
                    }
                }
            },
            labels: ['Vocab', 'Kanji', 'Radical'],
        };

        chartBuffer.push(


            <Grid container key={5321}>
                <Grid item xs={2}>
                    <Button variant="contained" style={{ margin:0, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} color="primary" onClick={this.left}>
                        <KeyboardArrowLeft/>
                    </Button>
                </Grid>
                <Grid item xs={6} style={{margin: 0}}>
                    <div className="chart">
                    <Chart options={x} series={this.state.data[this.state.curLvl]} type="radialBar"  width={170} height={250}  />
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} color="primary" onClick={this.right}>
                        <KeyboardArrowRight/>
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    Apr:{this.state.stageCount[0]}
                    <br />
                    GRU:{this.state.stageCount[1]}
                    <br />
                    MST:{this.state.stageCount[2]}
                    <br />
                    ENL:{this.state.stageCount[3]}
                    <br />
                    BRN:{this.state.stageCount[4]}
                </Grid>
            </Grid>
        );

        //console.log(chartBuffer);
        this.setState({buff:chartBuffer})

    };


    componentDidMount() {
        this.updateChart();
    }

    render() {
        return (

                <h1>{this.state.buff}</h1>

        );
    }
}

export default LevelTile;