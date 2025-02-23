import cl from './Ticket.module.scss'

function Ticket() {
    return(
        <li className={cl.ticketItem}>
            <div className={cl.infoWrapper}>
                <div className={cl.ticketHeader}>
                    <span className={cl.price}>13 400 Р</span>
                    <img src="./src/media/S7_logo.png" alt="s7" />
                </div>
                <div></div>
            </div>
        </li>
    )
}

export default Ticket