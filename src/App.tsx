import cl from './App.module.scss'
import Ticket from "./components/Ticket/Ticket.tsx";
import SideFilters from './components/SideFilters/SideFilters.tsx'

function App() {
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
                    <ul style={{width: 'inherit', height: 'fit-content'}}>
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
