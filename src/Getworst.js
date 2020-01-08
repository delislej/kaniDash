async function Getworst() {

    const apiToken = 'c456bd21-adcc-4b74-956f-22d4785633c7';
    const apiEndpointPath = 'review_statistics?percentages_less_than=40';
    const requestHeaders =
        new Headers({
            Authorization: 'Bearer ' + apiToken,
        });
    const apiEndpoint =
        new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
            method: 'GET',
            headers: requestHeaders
        });

    let data = {};
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(responseBody => data = responseBody.data)
        .then(() => {
            return data
        });


}

export default Getworst