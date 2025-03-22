import cl from '../TicketList/TicketList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sortCheapest, sortFastest, sortOptimal } from '../../actions.ts';

const SortFilters = () => {
    const dispatch = useDispatch();
    //@ts-ignore
    const activeSort = useSelector((state) => state.activeSort)

    return(
        <nav className={cl.sortFilters}>
            <input type='checkbox' onChange={() => dispatch(sortCheapest())}
                   checked={ activeSort === 'SORT_CHEAPEST' }
                   id='cheapest'
                   name='cheapest'/>
            <label htmlFor='cheapest'>Самый дешевый</label>
            <input type='checkbox' onChange={() => dispatch(sortFastest())}
                   checked={ activeSort === 'SORT_FASTEST' }
                   id='fastest'
                   name='fastest'/>
            <label htmlFor='fastest'> Самый быстрый</label>
            <input type='checkbox' onChange={() => dispatch(sortOptimal())}
                   checked={ activeSort === 'SORT_OPTIMAL' }
                   id='optimal'
                   name='optimal'/>
            <label htmlFor='optimal'>  Оптимальный</label>
        </nav>
    )
}

export default SortFilters;