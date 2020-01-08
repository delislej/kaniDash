import React, {Component} from "react"
import Collapsible from 'react-collapsible';
import Subject from "./Subject";
import "./style.css"

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://swapi.co/
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            reviewData: {},
            apiToken:'c456bd21-adcc-4b74-956f-22d4785633c7',
            apiEndpointPath: 'review_statistics?percentages_less_than=45',
            apiEndpointPath2: 'subjects?ids='


        }
    }





    componentDidMount() {
        let buff = []
        this.setState({loading: true

        })

        var requestHeaders =
            new Headers({
                Authorization: 'Bearer ' + this.state.apiToken,
            });
        var apiEndpoint =
            new Request('https://api.wanikani.com/v2/' + this.state.apiEndpointPath, {
                method: 'GET',
                headers: requestHeaders
            });

        var apiEndpoint2 =
            new Request('https://api.wanikani.com/v2/' + this.state.apiEndpointPath2, {
                method: 'GET',
                headers: requestHeaders
            });

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(responseBody => {
                console.log(responseBody)
                this.setState({

                    reviewData: responseBody.data,
                })

                for(let i = 0; i < responseBody.total_count;i++) {
                    if(i >15)
                    {
                        break;
                    }

                    apiEndpoint2 =
                        new Request('https://api.wanikani.com/v2/' + this.state.apiEndpointPath2 + responseBody.data[i].data.subject_id, {
                            method: 'GET',
                            headers: requestHeaders
                        });


                    fetch(apiEndpoint2)
                        .then(response => response.json())
                        .then(responseBody => {
                            buff.push(Subject(responseBody))


                            this.setState({
                                buffer: buff

                            });

                        });
                    this.setState({
                        loading: false
                    });
                }
            });



    }

    render() {
        const text = this.state.loading ? "loading..." :`Wall of shame:`
        if (this.state.secondReview === 0) {
            return null;
        }

        return (
            <div>
                <Collapsible trigger={text}>
                {
                    this.state && !this.state.loading && <div>{this.state.buffer}</div>
                }
                </Collapsible>
            </div>
        )
    }
}




export default App
