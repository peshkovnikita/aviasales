type IFiltersState = Record<
    'TOGGLE_ALL' | 'TOGGLE_NO_CHANGES' | 'TOGGLE_ONE_CHANGE' | 'TOGGLE_TWO_CHANGES' | 'TOGGLE_THREE_CHANGES',
    boolean
>;

type ActiveSort = 'SORT_CHEAPEST' | 'SORT_FASTEST' | 'SORT_OPTIMAL' | null;

interface Ticket {
    price: number
    carrier: string
    segments: [
        {
            origin: string
            destination: string
            date: string
            stops: string[]
            duration: number
        },
        {
            origin: string
            destination: string
            date: string
            stops: string[]
            duration: number
        }
    ]
}

interface TicketData {
    tickets: Ticket[] | [];
    isLoading: boolean;
    error: boolean;
}

export interface IState {
    visibleTickets: Ticket[] | [];
    activeSort: ActiveSort,
    data: TicketData;
    filters: IFiltersState;
}

export type Action = {
    type: string,
    tickets?: Ticket[],
    sortedTickets?: Ticket[],
    amount?: number;
};

const initialState:IState = {
    visibleTickets: [],
    data: {
        tickets: [],
        isLoading: false,
        error: false,
    },
    activeSort: null,
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
                isLoading: true,
            }
        }
    }

    if (action.type === 'SET_DATA') {
        return {
            ...state,
            visibleTickets: action.tickets.slice(0, 5),
            data: {
                ...state.data,
                //@ts-ignore
                tickets: action.tickets.slice(5, 500),
            }
        }
    }

    if (action.type === 'ADD_DATA') {
        return {
            ...state,
            data: {
                ...state.data,
                //@ts-ignore
                tickets: state.data.tickets.concat(action.tickets),
            }
        }
    }

    if (action.type === 'FETCH_END') {
        return {
            ...state,
            data: {
                ...state.data,
                isLoading: false,
            }
        }
    }

    if (action.type === 'FETCH_ERROR') {
        return {
            ...state,
            data: {
                ...state.data,
                isLoading: false,
                error: !state.data.error
            }
        }
    }

    if (action.type === 'LOAD_MORE') {
        return {
            ...state,
            visibleTickets: state.visibleTickets
                //@ts-ignore
                                 .concat(state.data.tickets
                                     .slice(state.visibleTickets.length, state.visibleTickets.length + action.amount)),
        }
    }

    if(action.type === 'VISIBLE_TICKETS') {
        return {
            ...state,
            //@ts-ignore
            visibleTickets: action.visible
        }
    }

    if(action.type === 'SORT_CHEAPEST') {
        return {
            ...state,
            visibleTickets: [...state.visibleTickets].sort((a, b) => a.price - b.price),
            activeSort: action.type,
        }
    }

    if(action.type === 'SORT_FASTEST') {
        return {
            ...state,
            visibleTickets: [...state.visibleTickets].sort((a, b) =>
                                (a.segments[0].duration + a.segments[1].duration) -
                                (b.segments[0].duration + b.segments[1].duration)),
            activeSort: action.type,
        }
    }

    if(action.type === 'SORT_OPTIMAL') {
        return {
            ...state,
            visibleTickets: [...state.visibleTickets].sort((a, b) =>
                                (b.price / (b.segments[0].duration + b.segments[1].duration)) -
                                (a.price / (a.segments[0].duration + a.segments[1].duration))),
            activeSort: action.type,
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