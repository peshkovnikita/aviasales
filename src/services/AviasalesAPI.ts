const searchIdUrl = `https://aviasales-test-api.kata.academy/search`

async function getId() {
    try {
        const response = await fetch(searchIdUrl);
        const body = await response.json();
        return body.searchId;
    }
    catch (e) {
        console.error('ID not found', e.message)
    }
}

async function getTicketsChunk(id) {
    let response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);

    if(response.ok) {
        console.log(response.status)
        const chunkData = await response.json();
        return await chunkData;
    }

    return getTicketsChunk(id)
}

export const getAllTickets = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_START' });

        try {
            const id = await getId();

            for (let chunkCounter = 0; chunkCounter < 20; chunkCounter++) {
                const data = await getTicketsChunk(id);
                dispatch({ type: 'ADD_DATA', tickets: data.tickets});
            }

            dispatch({type: 'FETCH_END'});

        } catch (error) {
            console.error('Ошибка при загрузке билетов:', error);
            dispatch({ type: 'FETCH_ERROR' });
        }
    };
};
