import React from "react"
import Collapsible from 'react-collapsible';
function Subject(input){

    const divStyle = {
        margin: '40px',
        border: '5px solid pink'
    };
    const pStyle = {
        fontSize: '15px',
        textAlign: 'center'
    };


    console.log(input.data[0].data)
    return (
        <Collapsible trigger={input.data[0].data.characters}>
            <p>Type:{input.data[0].object} </p>
            <p>Reading:{input.data[0].data.readings[0].reading} </p>
            <p>Meaning:{input.data[0].data.meanings[0].meaning}</p>

        </Collapsible>

    )}

export default Subject