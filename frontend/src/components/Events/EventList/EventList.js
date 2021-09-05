import React, { useContext } from 'react';

import EventItem from '../EventItem/EventItem'
import './EventList.css'

function EventList({ events = [] }) {

    const eventList = events.map(event => (
        <EventItem
            title={event.title}
            creatorId={event.creator._id}
            key={event._id}
            price={`${event.price} $`}
            description={event.description}
        />
    ))

    return (
        <ul className="event__list">
            {eventList}
        </ul>
    )
}

export default EventList