import type { Action } from './reducer'

export const toggleAll = ():Action => ({ type: 'TOGGLE_ALL' });
export const toggleNoChanges = ():Action => ({ type: 'TOGGLE_NO_CHANGES' });
export const toggleOneChange = ():Action => ({ type: 'TOGGLE_ONE_CHANGE' });
export const toggleTwoChanges = ():Action => ({ type: 'TOGGLE_TWO_CHANGES' });
export const toggleThreeChanges = ():Action => ({ type: 'TOGGLE_THREE_CHANGES' });

export const loadMore = () => ({ type: 'LOAD_MORE', amount: 5 });

export const SORT_CHEAPEST = 'SORT_CHEAPEST';
export const SORT_FASTEST = 'SORT_FASTEST';
export const SORT_OPTIMAL = 'SORT_OPTIMAL';

export const sortCheapest = () => ({ type: SORT_CHEAPEST });

export const sortFastest = () => ({ type: SORT_FASTEST });

export const sortOptimal = () => ({ type: SORT_OPTIMAL });


