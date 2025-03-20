import cl from './SideFilter.module.scss'
import type { IState } from '../../reducer'

import { useSelector, useDispatch } from 'react-redux';
import { toggleAll, toggleNoChanges, toggleOneChange, toggleTwoChanges, toggleThreeChanges } from '../../actions.ts';

const filters = [
    { id: 'all', label: 'Все', action: toggleAll, stateKey: 'TOGGLE_ALL' },
    { id: 'noChange', label: 'Без пересадок', action: toggleNoChanges, stateKey: 'TOGGLE_NO_CHANGES' },
    { id: 'oneChange', label: '1 пересадка', action: toggleOneChange, stateKey: 'TOGGLE_ONE_CHANGE' },
    { id: 'twoChanges', label: '2 пересадки', action: toggleTwoChanges, stateKey: 'TOGGLE_TWO_CHANGES' },
    { id: 'threeChanges', label: '3 пересадки', action: toggleThreeChanges, stateKey: 'TOGGLE_THREE_CHANGES' }
];

const FilterItem = ({ id, label, checked, onChange }) => {
    return(
        <li>
            <input type='checkbox' onChange={onChange} checked={checked} id={id} name={id}/>
            <label htmlFor={id}><span>{label}</span></label>
        </li>
    );
}

function SideFilters() {
    const dispatch = useDispatch();
    const filtersState = useSelector((state: IState) => state.filters);
    const visibleTickets = useSelector((state: IState) => state.visibleTickets);

    const filterItems = filters.map(({ id, label, action, stateKey }) => (
        <FilterItem
            key={id}
            id={id}
            label={label}
            onChange={() => dispatch(action(visibleTickets))}
            checked={filtersState[stateKey]}
        />
    ));

    return(
        <aside className={cl.wrapper}>
            <span className={cl.title}>
                Количество пересадок
            </span>
            <ul className={cl.sideFilters}>
                { filterItems }
            </ul>
        </aside>
    )
}

export default SideFilters;