import React, {Component} from 'react';
import "./style.css";
import {Panel} from "rsuite";

class SubjectTile extends Component {
    constructor(props)
    {
        let x = [];
        x[1]="#4d79ff";
        x[2]="#4d79ff";
        x[3]="#4d79ff";
        x[4]="#4d79ff";
        x[5]="#348744";
        x[6]="#348744";
        x[7]="#9f9f31";
        x[8]="#8f572d";
        x[9]="#ac3737";
        let color = x[props.srsData];
        super(props);
        this.state= ({
            color:color,
            characters:"default",
            readings:["default reading"],
            readNum:0,
            meanNum:0,
            meanings:["default meaning","default meaning2"],
            url:"www.derp.com",
            level:-1
        });
        console.log(props);
    }

    componentDidMount() {
        let meanBuff = [];
        let readBuff = [];
        let meanings = this.state.meanings;
        meanings = this.props.data.data.meanings;

        for(let i = 0; i < meanings.length;i++) {
            this.setState({characters:this.props.data.data.meanings[0].meaning})
            if (this.props.data.data.meanings[i].primary) {
                meanBuff.push(<span>
                            <span className="prim" key={i}>Primary</span>
                            <span>: {this.props.data.data.meanings[i].meaning}</span>
                    </span>)
            }
            else {
                meanBuff.push(<p>{meanings[i].meaning}</p>)
            }
        }

        if (!(typeof (this.props.data.data.readings) === 'undefined')) {
            this.setState({readNum:this.props.data.data.readings.length})
            for (let i = 0; i < this.props.data.data.readings.length; i++) {
                if (this.props.data.data.readings[i].primary === true || (this.props.data.data.readings.length === 1)) {
                    readBuff.push(<span>
                            <span className="prim" key={i}>Primary</span>
                            <span>: {this.props.data.data.readings[i].reading}</span>
                    </span>
                    )
                } else {
                    readBuff.push(<p> {this.props.data.data.readings[i].reading}</p>)
                }
            }
        }

        if(this.props.data.data.characters !== null)
        {
            this.setState({characters:this.props.data.data.characters})
        }

        this.setState({
            meanings: meanBuff,
            readings: readBuff,
            meanNum:this.props.data.data.meanings.length

        });
    }

    render() {
        const Card = props => (
            <Panel {...props} bordered>

            </Panel>
        );
        return (

            <div>
                <Panel header= {this.state.characters} collapsible shaded bordered style={{margin:"10px", backgroundColor: this.state.color}}>

                    <Card>
                        <Panel collapsible header="readings:" bordered shaded style={{marginBottom:"10px", backgroundColor: "#131313"}}>
                            {this.state.readings}
                        </Panel>
                        <Panel collapsible header="meanings:"  bordered shaded style={{backgroundColor: "#131313"}}>
                            {this.state.meanings}
                        </Panel>
                    </Card>


                </Panel>
            </div>
        )
    }
}

export default SubjectTile;