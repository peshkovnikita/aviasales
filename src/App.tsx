import cl from './App.module.scss'
import TicketList from './components/TicketList/TicketList.tsx';
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
                <TicketList />
            </section>
        </main>
      </>
  )
}

export default App
