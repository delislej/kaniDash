import React from "react"
import Collapsible from 'react-collapsible';
function Subject(input){

    const prim = {
        color: "red"
    };

    let readings = [];
    let meanings = [];
    let type = [];
    let trigger = [];



    if(input.object === 'collection') {

        type.push(input.data[0].object);
        trigger.push(input.data[0].data.characters);
        if (!(typeof (input.data[0].data.readings) === 'undefined')) {
            for (let i = 0; i < input.data[0].data.readings.length; i++) {
                //console.log(input.data[0].data.readings[i].reading)
                if (input.data[0].data.readings[i].primary === true) {
                    readings.push(<span><span style={prim}
                                              key={i}>Primary</span><span>: {input.data[0].data.readings[i].reading}</span></span>)
                } else {
                    readings.push(<p> {input.data[0].data.readings[i].reading}</p>)
                }
            }
        }


        for (let i = 0; i < input.data[0].data.meanings.length; i++) {
            //console.log(input.data[0].data.meanings[i].reading)
            if (input.data[0].data.meanings[i].primary === true) {
                meanings.push(<span><span
                    style={prim}>Primary</span><span>: {input.data[0].data.meanings[i].meaning}</span></span>)
            } else {
                meanings.push(<p> {input.data[0].data.meanings[i].meaning}</p>)
            }
        }
    }
    else{
        type.push(input.object);
        trigger.push(input.data.characters);
        if (!(typeof (input.data.readings) === 'undefined')) {
            for (let i = 0; i < input.data.readings.length; i++) {
                //console.log(input.data[0].data.readings[i].reading)
                if (input.data.readings[i].primary === true) {
                    readings.push(<span><span style={prim}
                                              key={i}>Primary</span><span>: {input.data.readings[i].reading}</span></span>)
                } else {
                    readings.push(<p> {input.data.readings[i].reading}</p>)
                }
            }
        }


        for (let i = 0; i < input.data.meanings.length; i++) {
            //console.log(input.data[0].data.meanings[i].reading)
            if (input.data.meanings[i].primary === true) {
                meanings.push(<span><span
                    style={prim}>Primary</span><span>: {input.data.meanings[i].meaning}</span></span>)
            } else {
                meanings.push(<p> {input.data.meanings[i].meaning}</p>)
            }
        }



    }

    return (
        <Collapsible trigger={trigger} >
            Type: {type}
            <Collapsible trigger={`readings`}>
                {readings}
            </Collapsible>
            <Collapsible trigger={`meanings`}>
                {meanings}
            </Collapsible>
        </Collapsible>
    )}

export default Subject