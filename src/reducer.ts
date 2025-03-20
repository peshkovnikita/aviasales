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
    visibleTickets: Ticket[] | [];
    unfilteredTickets: Ticket[] | [];
    activeSort: ActiveSort,
    data: TicketData;
    filters: IFiltersState;
}

export type Action = {
    type: string,
    tickets?: Ticket[],
    sortedTickets?: Ticket[],
    newVisibleTickets?: Ticket[],
    amount?: number,
    ticketsForFiltering?: number,
};

const initialState:IState = {
    visibleTickets: [],
    unfilteredTickets: [],
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
            visibleTickets: action.tickets.slice(0, 5).sort((a, b) => a.price - b.price),
            data: {
                ...state.data,
                //@ts-ignore
                tickets: action.tickets,
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
            visibleTickets: action.newVisibleTickets,
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
        const isAllToggled = !state.filters.TOGGLE_ALL;
        if(isAllToggled) {
            return {
                ...state,
                visibleTickets: [...state.unfilteredTickets],
                unfilteredTickets: [],
                filters: {
                    TOGGLE_ALL: isAllToggled,
                    TOGGLE_NO_CHANGES: isAllToggled,
                    TOGGLE_ONE_CHANGE: isAllToggled,
                    TOGGLE_TWO_CHANGES: isAllToggled,
                    TOGGLE_THREE_CHANGES: isAllToggled,
                }
            };
        }
        else {
            return {
                ...state,
                visibleTickets: [],
                unfilteredTickets: [...state.visibleTickets],
                filters: {
                    TOGGLE_ALL: isAllToggled,
                    TOGGLE_NO_CHANGES: isAllToggled,
                    TOGGLE_ONE_CHANGE: isAllToggled,
                    TOGGLE_TWO_CHANGES: isAllToggled,
                    TOGGLE_THREE_CHANGES: isAllToggled,
                }
            };
        }
    }
// Сделать counter в state для кол-ва загруженных tickets (изначально их 5),
// чтобы с помощью slice обращаться ко всему массиву tickets.
// Убрать поле unfilteredTickets из state

    // if(action.type === 'TOGGLE_NO_CHANGES') {
    //     const isNoChangesToggled = !state.filters.TOGGLE_NO_CHANGES;
    //     if(isNoChangesToggled && !state.filters.TOGGLE_ALL && !state.filters.TOGGLE_ONE_CHANGE && !state.filters.TOGGLE_TWO_CHANGES && !state.filters.TOGGLE_THREE_CHANGES) {
    //         return {
    //             ...state,
    //             visibleTickets: [...state.unfilteredTickets].filter(ticket =>
    //                     ticket.segments.some(segment => segment.stops.length === 0)),
    //             unfilteredTickets: [...state.visibleTickets],
    //             filters: {
    //                 ...state.filters,
    //                 TOGGLE_ALL: false,
    //                 TOGGLE_NO_CHANGES: isNoChangesToggled,
    //                 TOGGLE_ONE_CHANGE: false,
    //                 TOGGLE_TWO_CHANGES: false,
    //                 TOGGLE_THREE_CHANGES: false,
    //             }
    //         };
    //     }
    // }

    if (action.type !== 'TOGGLE_ALL' && action.type.startsWith('TOGGLE')) {
        const key = action.type;
        const updatedFilters = {
            ...state.filters,
            [key]: !state.filters[key]
        };

        if(willToggleAll(updatedFilters)) {
            return {
                ...state,
                visibleTickets: [...state.unfilteredTickets],
                unfilteredTickets: [],
                filters: {
                    ...updatedFilters,
                    TOGGLE_ALL: true
                }
            };
        }
    }

    return state;
}

export default reducer;