import cl from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket.tsx';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTickets } from '../../services/AviasalesAPI.ts'
import { IState } from '../../reducer.ts';
import {Progress} from 'antd';

const TicketList = () => {
    const dispatch = useDispatch();
    const { tickets: ticketsList, isLoading, error } = useSelector((state: IState) => state.data);
    const state = useSelector((state: IState) => state.data);

    const [amount, setAmount] = useState(0)

    useEffect(() => {
        // @ts-ignore
        dispatch(getAllTickets())
    }, [dispatch]);

    useEffect(() => {
        if(ticketsList) setAmount(ticketsList.length / 100)
    }, [ticketsList]);

    const errorMessage = <div style={{ color: 'red' }}>Network Error!</div>;

    const tickets = ticketsList ?
        ticketsList.map((data, index) =>
            <Ticket key={index} {...data} />)
        : null;

    return(
        <section>
            <Progress percent={amount} showInfo={false} style={{ marginBottom: '10px' }} strokeColor='#2196F3' />
            <nav className={cl.sortFilters}>
                <button>Самый дешевый</button>
                <button>Самый быстрый</button>
                <button>Оптимальный</button>
            </nav>
            <div className={cl.ticketsContainer}>
                {error ? errorMessage: null}
                <ul>
                    { tickets }
                </ul>
                {!isLoading ?
                    <button type='button' className={cl.btnLoadMore} onClick={() => console.log(state)}>
                        Показать еще 5 билетов!
                    </button>
                    : null}
            </div>
        </section>
    )
}

export default TicketList;