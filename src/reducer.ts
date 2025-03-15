type IFiltersState = Record<
    'TOGGLE_ALL' | 'TOGGLE_NO_CHANGES' | 'TOGGLE_ONE_CHANGE' | 'TOGGLE_TWO_CHANGES' | 'TOGGLE_THREE_CHANGES',
    boolean
>;

interface Ticket {
    // Цена в рублях
    price: number
    // Код авиакомпании (iata)
    carrier: string
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: [
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета туда
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        },
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета обратно
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        }
    ]
}

interface TicketData {
    tickets: [Ticket] | null;
    isLoading: boolean
}

export interface IState {
    data: TicketData
    filters: IFiltersState;
}

export type Action = {
    type: string,
    tickets?: [Ticket]
};

const initialState:IState = {
    data: {
        tickets: null,
        isLoading: false,
    },
    filters: {
        TOGGLE_ALL: true,
        TOGGLE_NO_CHANGES: true,
        TOGGLE_ONE_CHANGE: true,
        TOGGLE_TWO_CHANGES: true,
        TOGGLE_THREE_CHANGES: true,
    },
}

const willToggleAll = (filterState):boolean =>
    filterState.TOGGLE_NO_CHANGES &&
    filterState.TOGGLE_ONE_CHANGE &&
    filterState.TOGGLE_TWO_CHANGES &&
    filterState.TOGGLE_THREE_CHANGES;

const reducer = (state: IState = initialState, action:Action ): IState => {
    if (action.type === 'FETCH_START') {
        return {
            ...state,
            data: {
                ...state.data,
                isLoading: !state.data.isLoading,
            }
        }
    }

    if (action.type === 'SET_DATA') {
        return {
            ...state,
            data: {
                tickets: action.tickets,
                isLoading: !state.data.isLoading,
            }
        }
    }

    if (action.type === 'TOGGLE_ALL') {
        const newValue = !state.filters.TOGGLE_ALL;
        return {
            ...state,
            filters: {
                TOGGLE_ALL: newValue,
                TOGGLE_NO_CHANGES: newValue,
                TOGGLE_ONE_CHANGE: newValue,
                TOGGLE_TWO_CHANGES: newValue,
                TOGGLE_THREE_CHANGES: newValue,
            }
        };
    }

    if (action.type !== 'TOGGLE_ALL' && action.type.startsWith('TOGGLE')) {
        const key = action.type;
        const updatedFilters = {
            ...state.filters,
            [key]: !state.filters[key]
        };

        return {
            ...state,
            filters: {
                ...updatedFilters,
                TOGGLE_ALL: willToggleAll(updatedFilters)
            }
        };
    }

    return state;
}

export default reducer;