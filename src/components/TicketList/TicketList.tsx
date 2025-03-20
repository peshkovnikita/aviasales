import cl from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket.tsx';
import SortFilters from '../SortFilters/SortFilters.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMore } from '../../actions.ts';

import { getAllTickets } from '../../services/AviasalesAPI.ts'
import { IState } from '../../reducer.ts';
import { Progress } from 'antd';

const TicketList = () => {
    const dispatch = useDispatch();
    const { tickets: ticketsList, isLoading, error } = useSelector((state: IState) => state.data);
    //@ts-ignore
    const activeSort = useSelector((state) => state.activeSort);
    const visibleTickets = useSelector((state: IState) => state.visibleTickets);

    const [amount, setAmount] = useState(0)
    const [shownList, setList] = useState([])

    // загрузка билетов из api при маунтинге TicketList
    useEffect(() => {
        // @ts-ignore
        dispatch(getAllTickets())
    }, [dispatch]);

    // рассчет значения прогресса загрузки для <Progress/>
    useEffect(() => {
        if(ticketsList) setAmount(ticketsList.length / 100);
    }, [ticketsList]);

    // устанавливает видимые билеты
    useEffect(() => setList(visibleTickets), [visibleTickets])

    const errorMessage = <p style={{ color: 'red' }}>Network Error!</p>;
    const progressStatus = isLoading ? 'active' : 'normal';
    const thumbNail = <p style={{ fontSize: '14px', paddingTop: '10px' }}>
                          Рейсов, подходящих под заданные фильтры, не найдено
                      </p>

    const tickets = visibleTickets.length ?
        shownList.map(data =>
            <Ticket
                key={`${data.segments[0].date}-${data.segments[1].date}`}
                {...data}
            />)
        : thumbNail;

    return(
        <section>
            <Progress percent={amount} showInfo={false} status={progressStatus} style={{ marginBottom: '10px' }} strokeColor='#2196F3' />
            <SortFilters />
            <div className={cl.ticketsContainer}>
                {error ? errorMessage: null}
                <ul>
                    { tickets }
                </ul>
                { visibleTickets.length ?
                    <button type='button' className={cl.btnLoadMore} onClick={ () => dispatch(loadMore(ticketsList, shownList, activeSort)) }>
                        Показать еще 5 билетов!
                    </button>
                    : null
                }
            </div>
        </section>
    )
}

export default TicketList;