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

    const errorMessage = error ? <p style={{ color: 'red' }}>Ошибка сети</p> : null;
    const thumbNail = !visibleTickets.length ?
        <p style={{ fontSize: '14px', paddingTop: '10px' }}>
            Рейсов, подходящих под заданные фильтры, не найдено
        </p> : null;

    const loadMoreBtn = visibleTickets.length ?
        <button type='button' className={cl.btnLoadMore} onClick={ () => dispatch(loadMore()) }>
            Показать еще билеты!
        </button>
        : null;

    const tickets = visibleTickets.length ?
        shownList.map(data =>
            <Ticket
                key={`${data.segments[0].date}-${data.segments[1].date}`}
                {...data}
            />)
        : null;

    return(
        <section>
            <Progress
                percent={amount}
                showInfo={false}
                status={isLoading ? 'active' : 'normal'}
                style={{ marginBottom: '10px' }}
                strokeColor='#2196F3' />
            <SortFilters />
            <div className={cl.ticketsContainer}>
                { errorMessage  }
                { thumbNail }
                <ul>
                    { tickets }
                </ul>
                { loadMoreBtn }
            </div>
        </section>
    )
}

export default TicketList;