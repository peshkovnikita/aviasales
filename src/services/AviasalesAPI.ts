const searchIdUrl = `https://aviasales-test-api.kata.academy/search`

export async function getId() {
    try {
        const response = await fetch(searchIdUrl);
        const body = await response.json();
        return body.searchId;
    }
    catch (e) {
        console.error('ID not found', e.message)
    }
}

export const getTicketsThunk = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_START' });

        try {
            const id = await getId();
            const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
            const data = await response.json();

            console.table(data)
            dispatch({ type: 'SET_DATA', tickets: data.tickets});
        } catch (error) {
            console.error('Ошибка при загрузке билетов:', error);
            dispatch({ type: 'FETCH_ERROR' });
        }
    };
};
