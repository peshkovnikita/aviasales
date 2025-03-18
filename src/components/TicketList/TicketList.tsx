import cl from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket.tsx';
import SortFilters from '../SortFilters/SortFilters.tsx';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMore } from '../../actions.ts';

import { getAllTickets } from '../../services/AviasalesAPI.ts'
import { IState } from '../../reducer.ts';
import { Progress } from 'antd';

const TicketList = () => {
    const dispatch = useDispatch();
    const { tickets: ticketsList, isLoading, error } = useSelector((state: IState) => state.data);
    //const activeSort = useSelector((state) => state.activeSort)
    const visibleTickets = useSelector((state: IState) => state.visibleTickets);

    const [amount, setAmount] = useState(0)
    //const [shownList, setList] = useState([])

    // загрузка билетов из api при маунтинге TicketList
    useEffect(() => {
        // @ts-ignore
        dispatch(getAllTickets())
    }, [dispatch]);

    // рассчет значения прогресса загрузки для <Progress/>
    useEffect(() => {
        if(ticketsList) setAmount(ticketsList.length / 100);
    }, [ticketsList]);

    // useEffect(() => {
    //     if (activeSort) {
    //         switch (activeSort) {
    //             case "SORT_CHEAPEST":
    //                 dispatch(sortCheapest());
    //                 break;
    //             case "SORT_FASTEST":
    //                 dispatch(sortFastest());
    //                 break;
    //             case "SORT_OPTIMAL":
    //                 dispatch(sortOptimal());
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // }, [activeSort, dispatch]);

    // устанавливает видимые билеты
    // useEffect(() => {
    //     // @ts-ignore
    //     setList(visibleTickets)
    // }, [visibleTickets])

    const errorMessage = <p style={{ color: 'red' }}>Network Error!</p>;
    const progressStatus = isLoading ? 'active' : 'normal'

    const tickets = visibleTickets ?
        visibleTickets.map((data, index) =>
            <Ticket key={index} {...data} />)
        : null;

    return(
        <section>
            <Progress percent={amount} showInfo={false} status={progressStatus} style={{ marginBottom: '10px' }} strokeColor='#2196F3' />
            <SortFilters />
            <div className={cl.ticketsContainer}>
                {error ? errorMessage: null}
                <ul>
                    { tickets }
                </ul>
                {
                    <button type='button' className={cl.btnLoadMore} onClick={() => dispatch(loadMore())}>
                        Показать еще 5 билетов!
                    </button>
                }
            </div>
        </section>
    )
}

export default TicketList;