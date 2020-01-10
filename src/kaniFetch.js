

async function kaniFetch(endpoint, key) {

    let requestHeaders =
        new Headers({
            Authorization: 'Bearer ' + key,
        });
    let apiEndpoint =
        new Request('https://api.wanikani.com/v2/' + endpoint, {
            method: 'GET',
            headers: requestHeaders
        });

    try {
        const resp = await fetch(apiEndpoint);
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}

export default kaniFetch