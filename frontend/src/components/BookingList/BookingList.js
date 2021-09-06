import React from 'react';

import './BookingList.css'

const BookingList = ({bookings, onCancelBooking = ()=>{}}) => {

    const bookingsElem = bookings.map(booking => (
        <li className="bookings__item" key={booking._id}>
            <div className="bookings__item-info">
                {new Date(booking.createdAt).toLocaleDateString()} - {booking.event.title}
            </div>
            <div className="bookings__item-actions" onClick={()=>onCancelBooking(booking._id)}>
                <button className="btn">Cancel</button>
            </div>
        </li>
    ))


    return (
        <ul className="bookings__list">
            {bookingsElem}
        </ul>
    )
}

export default BookingList