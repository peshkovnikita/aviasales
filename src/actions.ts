import type { Action } from './reducer'

export const toggleAll = ():Action => ({ type: 'TOGGLE_ALL' });
export const toggleNoChanges = ():Action => ({ type: 'TOGGLE_NO_CHANGES' });
export const toggleOneChange = ():Action => ({ type: 'TOGGLE_ONE_CHANGE' });
export const toggleTwoChanges = ():Action => ({ type: 'TOGGLE_TWO_CHANGES' });
export const toggleThreeChanges = ():Action => ({ type: 'TOGGLE_THREE_CHANGES' });

export const loadMore = ():Action => ({ type: 'LOAD_MORE' })

export const sortCheapest = () => ({ type: 'SORT_CHEAPEST' });
export const sortFastest = () => ({ type: 'SORT_FASTEST' });
export const sortOptimal = () => ({ type: 'SORT_OPTIMAL' });


