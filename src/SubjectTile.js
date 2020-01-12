import React, {Component} from 'react';
import Collapsible from 'react-collapsible'

class SubjectTile extends Component {
    constructor(props)
    {
        super(props)
        this.state= ({
            characters:"default",
            readings:["default reading"],
            meanings:["default meaning","default meaning2"],
            url:"www.derp.com",
            level:-1
        })
    }
    componentDidMount() {
        console.log(this.props.data);
        let meanBuff = []

        let meanings = this.state.meanings;

        for(let i = 0; i < meanings.length;i++)
        {
            meanBuff.push(<p>{meanings[i]}</p>)
        }
        this.setState({meanings: meanBuff})
    }



    render() {
        return (
            <Collapsible trigger={this.state.characters}>
                <Collapsible trigger={"readings"}><span>{this.state.readings}</span></Collapsible>
                <Collapsible trigger={"meanings"}><span>{this.state.meanings}</span></Collapsible>
            </Collapsible>
        );
    }
}

export default SubjectTile;