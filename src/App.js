import React, {Component} from "react"
import Collapsible from 'react-collapsible';
import Subject from "./Subject";
import SubjectTile from "./SubjectTile";
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
        let shameBuff = [];
        let levelBuff=[];
        let ep1 = 'review_statistics?percentages_less_than=45'
        let ep2 = 'subjects?ids=';
        let token = 'c456bd21-adcc-4b74-956f-22d4785633c7';
        this.setState({loading: true
        });

        let userStats =await kaniFetch("user",token).then(function (res) {
            let userStats = {user:null, level:0};
            userStats.user = res.data.user;
            userStats.level = res.data.level;
            return userStats;
        });


        let data =  await kaniFetch(ep1,token).then(function(res) {
            for(let i = 0; i < res.total_count;i++)
            {
                if( i%15===0)
                {
                    setTimeout(null,3000)
                }
                kaniFetch(ep2+res.data[i].data.subject_id,token).then(function (res) {
                    shameBuff.push(Subject(res))

                })
            }
            return shameBuff;
        });
for(let i = 1; i <= userStats.level;i++) {
    let subjects = await kaniFetch('subjects?levels=' + i, token).then(function (res) {
        //console.log(res.data);
        let subs = [];


        for (let i = 0; i < res.data.length; i++) {
            subs.push(<SubjectTile data={res.data[i]}/>)
        }
        levelBuff.push(<Collapsible trigger={`level: ${i}`}>
            {subs}
        </Collapsible>);

        //console.log(subs);
        return levelBuff;

    });
    this.setState({buffer:data,
        buffer2:subjects})

}
        this.setState({buffer:data,
            loading:false});
}




    render() {
        const text = this.state.loading ? "loading..." :`Wall of shame(35%>):`
        return (
            <div>
                <Collapsible classParentString={"mainColl"} trigger={text}  triggerTagName={"div"} >
                {
                    this.state.buffer
                }
                </Collapsible>

                <Collapsible classParentString={"mainColl"} trigger={"levels:"}  triggerTagName={"div"} >
                    {
                        this.state.buffer2
                    }
                </Collapsible>

                <Collapsible classParentString={"mainColl"} trigger={"test"}  triggerTagName={"div"} >
                    <SubjectTile>lol</SubjectTile>
                </Collapsible>

            </div>



        )
    }
}

export default App
