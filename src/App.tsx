import cl from './App.module.scss'
import Ticket from './components/Ticket/Ticket.tsx';
import SideFilters from './components/SideFilters/SideFilters.tsx'

import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { getId } from './services/TicketsAPI.ts'

// const getTicketsThunk = (dispatch) => {
//     dispatch(getTickets())
// }

const getIden = async () => {
    const id = await getId()
    console.log(id)
}

function App() {
    //const dispatch = useDispatch();
// СОЗДАТЬ КОМПОНЕНТ TicketList И ДЕЛАТЬ ЗАПРОС К СЕРВЕРУ НА ПОИСК ID ИЗ НЕГО ПРИ МАУНТИНГЕ.
// ЧТОБЫ ОСТАЛЬНЫЕ ЧАСТИ ПРИЛОЖЕНИЯ НЕ ЗАВИСЕЛИ ОТ ЗАПРОСА НА СЕРВЕР
    useEffect(() => {
        getIden();
    }, []);

    return (
      <>
        <header>
            <a href='#' className={cl.logo}></a>
        </header>
        <main className={cl.main}>
            <SideFilters />
            <section>
                <nav className={cl.priceFilter}>
                    <button>Самый дешевый</button>
                    <button>Самый быстрый</button>
                    <button>Оптимальный</button>
                </nav>
                <div className={cl.ticketsContainer}>
                    <ul>
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                        <Ticket />
                    </ul>
                    <button type='button' className={cl.btnLoadMore}>
                        Показать еще 5 билетов!
                    </button>
                </div>
            </section>
        </main>
      </>
  )
}

export default App
