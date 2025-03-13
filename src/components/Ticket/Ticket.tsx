import cl from './Ticket.module.scss'

function Ticket() {
    return(
        <li className={cl.ticketItem}>
            <div className={cl.infoWrapper}>
                <div className={cl.ticketHeader}>
                    <span className={cl.price}>13 400 Р</span>
                    <img src="https://pics.avs.io/99/36/TK.png" alt='airline logo' />
                </div>
                <div className={cl.ticketInfo}>
                    <div className={cl.ticketDataContainer}>
                        <div className={cl.ticketData}>
                            <span>MOW - HKT</span>
                            <span>10:45 - 08:00</span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>В пути</span>
                            <span>21ч 15м</span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>2 пересадки</span>
                            <span>HKG, JNB</span>
                        </div>
                    </div>
                    <div className={cl.ticketDataContainer}>
                        <div className={cl.ticketData}>
                            <span>MOW - HKT</span>
                            <span>11:20 - 00:50</span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>В пути</span>
                            <span>13ч 30м</span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>1 пересадка</span>
                            <span>HKG</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Ticket