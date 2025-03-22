type IFiltersState = Record<
    'TOGGLE_ALL' | 'TOGGLE_NO_CHANGES' | 'TOGGLE_ONE_CHANGE' | 'TOGGLE_TWO_CHANGES' | 'TOGGLE_THREE_CHANGES',
    boolean
>;

type ActiveSort = 'SORT_CHEAPEST' | 'SORT_FASTEST' | 'SORT_OPTIMAL';

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
    visibleTickets: Ticket[] | [],
    loadedCount: number,
    activeSort: ActiveSort,
    data: TicketData,
    filters: IFiltersState,
}

export type Action = {
    type: string,
    tickets?: Ticket[],
};

const initialState:IState = {
    visibleTickets: [],
    loadedCount: 5,
    data: {
        tickets: [],
        isLoading: false,
        error: false,
    },
    activeSort: 'SORT_CHEAPEST',
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

const applyFilters = (tickets: Ticket[], filters: IFiltersState): Ticket[] => {
    if (filters.TOGGLE_ALL) return tickets;

    return tickets.filter(ticket => {
        return (
            (filters.TOGGLE_NO_CHANGES && ticket.segments.some(s => s.stops.length === 0)) ||
            (filters.TOGGLE_ONE_CHANGE && ticket.segments.some(s => s.stops.length === 1)) ||
            (filters.TOGGLE_TWO_CHANGES && ticket.segments.some(s => s.stops.length === 2)) ||
            (filters.TOGGLE_THREE_CHANGES && ticket.segments.some(s => s.stops.length === 3))
        );
    });
};

const sortTickets = (tickets: Ticket[], sortType: ActiveSort): Ticket[] => {
    switch (sortType) {
        case 'SORT_CHEAPEST':
            return [...tickets].sort((a, b) => a.price - b.price);
        case 'SORT_FASTEST':
            return [...tickets].sort((a, b) =>
                (a.segments[0].duration + a.segments[1].duration) -
                (b.segments[0].duration + b.segments[1].duration)
            );
        case 'SORT_OPTIMAL':
            return [...tickets].sort((a, b) =>
                (b.price / (b.segments[0].duration + b.segments[1].duration)) -
                (a.price / (a.segments[0].duration + a.segments[1].duration))
            );
        default:
            return tickets;
    }
};

const reducer = (state: IState = initialState, action: Action): IState => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, data: { ...state.data, isLoading: true } };

        case 'SET_DATA':
            return {
                ...state,
                data: { ...state.data, tickets: action.tickets || [] },
                loadedCount: 5,
                visibleTickets: sortTickets(applyFilters(action.tickets.slice(0, 5), state.filters), state.activeSort),
            };

        case 'ADD_DATA':
            return {
                ...state,
                data: { ...state.data, tickets: [...state.data.tickets, ...(action.tickets || [])] }
            };

        case 'FETCH_END':
            return { ...state, data: { ...state.data, isLoading: false } };

        case 'FETCH_ERROR':
            return { ...state, data: { ...state.data, isLoading: false, error: true } };

        case 'LOAD_MORE':
            const newLoadedCount = state.loadedCount + 5;
            return {
                ...state,
                loadedCount: newLoadedCount,
                visibleTickets: sortTickets(
                    applyFilters(state.data.tickets.slice(0, newLoadedCount), state.filters),
                    state.activeSort
                ),
            };

        case 'SORT_CHEAPEST':
        case 'SORT_FASTEST':
        case 'SORT_OPTIMAL':
            return {
                ...state,
                activeSort: action.type,
                visibleTickets: sortTickets(state.visibleTickets, action.type as ActiveSort),
            };

        case 'TOGGLE_ALL':
            const newFilterState = {
                TOGGLE_ALL: !state.filters.TOGGLE_ALL,
                TOGGLE_NO_CHANGES: !state.filters.TOGGLE_ALL,
                TOGGLE_ONE_CHANGE: !state.filters.TOGGLE_ALL,
                TOGGLE_TWO_CHANGES: !state.filters.TOGGLE_ALL,
                TOGGLE_THREE_CHANGES: !state.filters.TOGGLE_ALL,
            };
            return {
                ...state,
                filters: newFilterState,
                visibleTickets: sortTickets(
                    applyFilters(state.data.tickets.slice(0, state.loadedCount), newFilterState),
                    state.activeSort
                ),
            };

        default:
            if (action.type.startsWith('TOGGLE')) {
                const updatedFilters = {
                    ...state.filters,
                    [action.type]: !state.filters[action.type],
                    TOGGLE_ALL: willToggleAll({ ...state.filters, [action.type]: !state.filters[action.type] }),
                };
                return {
                    ...state,
                    filters: updatedFilters,
                    visibleTickets: sortTickets(
                        applyFilters(state.data.tickets.slice(0, state.loadedCount), updatedFilters),
                        state.activeSort
                    ),
                };
            }
            return state;
    }
};

export default reducer;