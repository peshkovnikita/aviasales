import type { Action } from './reducer'

export const toggleAll = ():Action => ({ type: 'TOGGLE_ALL' });
export const toggleNoChanges = (visibleTickets):Action => ({ type: 'TOGGLE_NO_CHANGES', ticketsForFiltering: visibleTickets.length });
export const toggleOneChange = (visibleTickets):Action => ({ type: 'TOGGLE_ONE_CHANGE', ticketsForFiltering: visibleTickets });
export const toggleTwoChanges = (visibleTickets):Action => ({ type: 'TOGGLE_TWO_CHANGES', ticketsForFiltering: visibleTickets });
export const toggleThreeChanges = (visibleTickets):Action => ({ type: 'TOGGLE_THREE_CHANGES', ticketsForFiltering: visibleTickets });

export const loadMore = (ticketsList, shownList, activeSort) => {
    const ticketsForVisibility = [...shownList]
        .concat(ticketsList.slice(shownList.length, shownList.length + 5))

    if(activeSort === 'SORT_CHEAPEST') {
        const sorted = ticketsForVisibility.sort((a, b) => a.price - b.price)
        return { type: 'LOAD_MORE', newVisibleTickets: sorted }
    }

    if(activeSort === 'SORT_FASTEST') {
        const sorted = ticketsForVisibility.sort((a, b) =>
            (a.segments[0].duration + a.segments[1].duration) -
            (b.segments[0].duration + b.segments[1].duration));
        return { type: 'LOAD_MORE', newVisibleTickets: sorted }
    }

    if(activeSort === 'SORT_OPTIMAL') {
        const sorted = ticketsForVisibility.sort((a, b) =>
            (b.price / (b.segments[0].duration + b.segments[1].duration)) -
            (a.price / (a.segments[0].duration + a.segments[1].duration)));
        return { type: 'LOAD_MORE', newVisibleTickets: sorted }
    }
}

export const sortCheapest = () => ({ type: 'SORT_CHEAPEST' });
export const sortFastest = () => ({ type: 'SORT_FASTEST' });
export const sortOptimal = () => ({ type: 'SORT_OPTIMAL' });


