import cl from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket.tsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTicketsThunk } from '../../services/AviasalesAPI.ts'
import { IState } from '../../reducer.ts';

const TicketList = () => {
    const dispatch = useDispatch();
    const { tickets: ticketsList, isLoading } = useSelector((state: IState) => state.data);
    const state = useSelector((state: IState) => state.data);

    useEffect(() => {
        // @ts-ignore
        dispatch(getTicketsThunk())
    }, [dispatch]);

    const loader = <div>Loading...</div>;
    const tickets = ticketsList ?
        ticketsList.map(data => <Ticket {...data} />)   // ДОБАВИТЬ ЛОАДЕР ANT DESIGN И АТРИБУТ KEY ДЛЯ КОМПОНЕНТА TICKET
        : null;                                         // СДЕЛАТЬ DISPATCH ДЛЯ ОШИБКИ СЕТИ

    return(
        <div className={cl.ticketsContainer}>
            {isLoading ? loader : null}
            <ul>
                { tickets }
            </ul>
            {!isLoading ?
                <button type='button' className={cl.btnLoadMore} onClick={() => console.log(state)}>
                    Показать еще 5 билетов!
                </button>
            : null}
        </div>
    )
}

export default TicketList;