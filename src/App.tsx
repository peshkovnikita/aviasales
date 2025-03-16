import cl from './App.module.scss';
import TicketList from './components/TicketList/TicketList.tsx';
import SideFilters from './components/SideFilters/SideFilters.tsx';

function App() {
    return (
      <>
        <header>
            <a href='#' className={cl.logo}></a>
        </header>
        <main className={cl.main}>
            <SideFilters />
            <TicketList />
        </main>
      </>
    )
}

export default App;
