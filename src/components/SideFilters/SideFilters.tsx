import cl from './SideFilter.module.scss'

function SideFilters() {
    return(
        <aside className={cl.wrapper}>
            <span className={cl.title}>
                Количество пересадок
            </span>
            <ul className={cl.sideFilters}>
                <li>
                    <input type='checkbox' id='all' name='all' />
                    <label htmlFor='all'>
                        <span>Все</span>
                    </label>
                </li>
                <li>
                    <input type='checkbox' id='noChange' name='noChange' />
                    <label htmlFor='noChange'>
                        <span>Без пересадок</span>
                    </label>
                </li>
                <li>
                    <input type='checkbox' id='oneChange' name='oneChange' />
                    <label htmlFor='oneChange'>
                        <span>1 пересадка</span>
                    </label>
                </li>
                <li>
                    <input type='checkbox' id='twoChanges' name='twoChanges' />
                    <label htmlFor='twoChanges'>
                        <span>2 пересадки</span>
                    </label>
                </li>
                <li>
                    <input type='checkbox' id='threeChanges' name='threeChanges' />
                    <label htmlFor='threeChanges'>
                        <span>3 пересадки</span>
                    </label>
                </li>
            </ul>
        </aside>
    )
}

export default SideFilters