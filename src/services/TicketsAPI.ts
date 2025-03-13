const searchIdUrl = `https://aviasales-test-api.kata.academy/search`

//const ticketUrl = `https://aviasales-test-api.kata.academy/tickets?searchId=${4fea18e490f3aa49025e931acd4908ff}`

export async function getId() {
    try {
        const response = await fetch(searchIdUrl);
        const body = await response.json();
        return body.searchId;
    }
    catch (e) {
        console.error(e.message())
    }
}