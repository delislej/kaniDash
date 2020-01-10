import React, {Component} from "react"
import Collapsible from 'react-collapsible';
import Subject from "./Subject";
import "./style.css"
import kaniFetch from "./kaniFetch";

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://swapi.co/
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    async componentDidMount() {
        let buff = [];
        let ep1 = 'review_statistics?percentages_less_than=45'
        let ep2 = 'subjects?ids=';
        let token = 'c456bd21-adcc-4b74-956f-22d4785633c7';
        this.setState({loading: true
        });

        let data =  await kaniFetch(ep1,token).then(function(res) {
            for(let i = 0; i < res.total_count;i++)
            {
                if(i >15)
                {
                    break;
                }
                kaniFetch(ep2+res.data[i].data.subject_id,token).then(function (res) {
                    buff.push(Subject(res))

                })
            }
            return buff;
        });
        this.setState({buffer:data,
        loading:false});
    }

    render() {
        const text = this.state.loading ? "loading..." :`Wall of shame(35%>):`
        return (
                <Collapsible classParentString={"mainColl"} trigger={text}>
                {
                    this.state.buffer
                }
                </Collapsible>
        )
    }
}




export default App
