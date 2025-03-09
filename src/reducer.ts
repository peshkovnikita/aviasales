type IFiltersState = Record<
    'TOGGLE_ALL' | 'TOGGLE_NO_CHANGES' | 'TOGGLE_ONE_CHANGE' | 'TOGGLE_TWO_CHANGES' | 'TOGGLE_THREE_CHANGES',
    boolean
>;

export interface IState {
    filters: IFiltersState;
}

interface IAction {
    type: string;
}

const initialState:IState = {
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


const reducer = (state: IState = initialState, action:IAction ): IState => {
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

    if(action.type !== 'TOGGLE_ALL') {
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