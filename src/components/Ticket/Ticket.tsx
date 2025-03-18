import cl from './Ticket.module.scss'
import { addMinutes } from 'date-fns';

const formatPrice = (initPrice: number) => {
    const price = String(initPrice);

    if(price.length < 6) return `${price.slice(0, 2)} ${price.slice(2, 5)} Р`;
    else return `${price.slice(0, 3)} ${price.slice(3, 6)} Р`;
}

const minToHours = (min) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;

    return `${hours}Ч ${minutes}М`
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

function Ticket({ price, carrier, segments }) {
    const [ thereFlight, backFlight ] = segments

    return(
        <li className={cl.ticketItem}>
            <div className={cl.infoWrapper}>
                <div className={cl.ticketHeader}>
                    <span className={cl.price}>
                        { formatPrice(price) }
                    </span>
                    <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt='airline logo' />
                </div>
                <div className={cl.ticketInfo}>
                    <div className={cl.ticketDataContainer}>
                        <div className={cl.ticketData}>
                            <span>
                                { `${thereFlight.origin} − ${thereFlight.destination}` }
                            </span>
                            <span>
                                { `${formatDate(thereFlight.date)} − ${formatDate(addMinutes(thereFlight.date, thereFlight.duration))}` }
                            </span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>В пути</span>
                            <span>{ minToHours(thereFlight.duration) }</span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>
                                { thereFlight.stops.length > 1 ?
                                    `${thereFlight.stops.length} пересадки` :
                                    thereFlight.stops.length === 1 ? '1 пересадка' : 'Без пересадок' }
                            </span>
                            <span>
                                { thereFlight.stops.length ? thereFlight.stops.join(', ') : '—' }
                            </span>
                        </div>
                    </div>
                    <div className={cl.ticketDataContainer}>
                        <div className={cl.ticketData}>
                            <span>
                                { `${backFlight.origin} − ${backFlight.destination}` }
                            </span>
                            <span>
                                { `${formatDate(backFlight.date)} − ${formatDate(addMinutes(backFlight.date, backFlight.duration))}` }
                            </span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>В пути</span>
                            <span>{ minToHours(backFlight.duration) }</span>
                        </div>
                        <div className={cl.ticketData}>
                            <span>
                                { backFlight.stops.length > 1 ?
                                    `${backFlight.stops.length} пересадки` :
                                    backFlight.stops.length === 1 ? '1 пересадка' : 'Без пересадок' }
                            </span>
                            <span>
                                { backFlight.stops.length ? backFlight.stops.join(', ') : '—' }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Ticket