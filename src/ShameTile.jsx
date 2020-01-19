import React, {Component} from 'react';
import Collapsible from 'react-collapsible'
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
        return (
            <Collapsible trigger={<span>{this.state.characters} | <a href={this.props.data.data.document_url} target="_blank" rel="noopener noreferrer">Info</a> | M:{this.state.meanNum} | R:{this.state.readNum}</span>} className="child" triggerTagName={"div"}>

                <div>
                    <Collapsible trigger={`readings: ${this.state.readNum}`} triggerTagName={"div"}><span>{this.state.readings}</span></Collapsible>
                </div>
                <div>
                    <Collapsible trigger={`meanings: ${this.state.meanNum}`} triggerTagName={"div"}><span>{this.state.meanings}</span></Collapsible>
                </div>
            </Collapsible>
        );
    }
}

export default SubjectTile;