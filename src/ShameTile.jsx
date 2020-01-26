import React, {Component} from 'react';
import {Panel} from 'rsuite';
import "./style.css";

class SubjectTile extends Component {
    constructor(props)
    {
        super(props);
        this.state= ({
            characters:"default",
            readings:["default reading"],
            readNum:0,
            meanNum:0,
            meanings:["default meaning","default meaning2"],
            url:"www.derp.com",
            level:-1
        });
    }

    componentDidMount() {
        let meanBuff = [];
        let readBuff = [];
        let meanings = this.state.meanings;
        meanings = this.props.data.data.meanings;


        for(let i = 0; i < meanings.length;i++) {
            this.setState({characters:this.props.data.data.meanings[0].meaning})
            if (this.props.data.data.meanings[i].primary) {
                meanBuff.push(<span key={i+500}>
                            <span className="prim" key={i}>Primary</span>
                            <span>: {this.props.data.data.meanings[i].meaning}</span>
                    </span>)
            }
            else {
                meanBuff.push(<p key={i+12000}>{meanings[i].meaning}</p>)
            }
        }

        if (!(typeof (this.props.data.data.readings) === 'undefined')) {
            this.setState({readNum:this.props.data.data.readings.length})
            for (let i = 0; i < this.props.data.data.readings.length; i++) {
                if (this.props.data.data.readings[i].primary === true || (this.props.data.data.readings.length === 1)) {
                    readBuff.push(<span key={i+200}>
                            <span className="prim" key={i}>Primary</span>
                            <span>: {this.props.data.data.readings[i].reading}</span>
                    </span>
                    )
                } else {
                    readBuff.push(<p key={19888+i}> {this.props.data.data.readings[i].reading}</p>)
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
                <Panel header= {this.state.characters} collapsible shaded bordered style={{margin:"10px", backgroundColor: "#565656"}}>

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


        );
    }
}

export default SubjectTile;