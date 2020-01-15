import React, {Component} from 'react';
import Chart from "react-apexcharts";

class LevelTile extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
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
                    height: 100,
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
                                label: 'level: '+ this.props.level,
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
                <Chart options={x} series={this.props.progData} type="radialBar" width={200} height={300} />
            );

        //console.log(chartBuffer);
        this.setState({buff:chartBuffer})

    }

    render() {
        return (
            <p>
                {this.state.buff}
            </p>
        );
    }
}

export default LevelTile;