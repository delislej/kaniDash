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

    componentDidMount() {
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
                                label: this.props.level,
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


    <Grid container spacing={10}>
        <Grid item xs={2}>
            <Button variant="contained" color="primary">
                <KeyboardArrowLeft/>
            </Button>
        </Grid>
        <Grid item xs={4}>
            <Chart options={x} series={this.props.progData} type="radialBar"  width={175} height={250} />
    </Grid>
        <Grid item xs={2}>
            <Button variant="contained" color="primary">
                <KeyboardArrowRight/>
            </Button>
        </Grid>
    </Grid>
            );

        //console.log(chartBuffer);
        this.setState({buff:chartBuffer})

    }

    render() {
        return (

                <h1>{this.state.buff}</h1>

        );
    }
}

export default LevelTile;