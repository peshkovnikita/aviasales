import cl from './App.module.scss'

function App() {
  return (
    <>
        <header>
            <a href='#' className={cl.logo}></a>
        </header>
        <main className={cl.main}>
            <aside>Side Filters</aside>
            <section>
                <nav className={cl.priceFilter}>
                    <button>Самый дешевый</button>
                    <button>Самый быстрый</button>
                    <button>Оптимальный</button>
                </nav>
                <div className={cl.ticketsContainer}>
                    <ul style={{width: '300px', height: '100px'}}>
                        <li>
                            ticket 1
                        </li>
                        <li>
                            ticket 1
                        </li>
                        <li>
                            ticket 1
                        </li>
                    </ul>
                </div>
            </section>
        </main>
        <footer>
            Footer
        </footer>
    </>
  )
}

export default App
