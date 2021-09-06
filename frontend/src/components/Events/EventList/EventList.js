import React, { useContext, useState } from 'react';

import EventItem from '../EventItem/EventItem'
import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import { AuthContext } from '../../../context/auth-context';
import './EventList.css'

function EventList({ events = [] , onBookEvent}) {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const authContext = useContext(AuthContext)

    const showDetailsHandler = eventId => {
        const event = events.find(e => e._id === eventId)
        setSelectedEvent(event)
    }

    const eventList = events.map(event => (
        <EventItem
            eventId={event._id}
            title={event.title}
            creatorId={event.creator._id}
            key={event._id}
            price={`${event.price} $`}
            description={event.description}
            date={event.date}
            onDetail={showDetailsHandler}
        />
    ))

    return (
        <React.Fragment>
            <ul className="event__list">
                {eventList}
            </ul>
            {
                selectedEvent &&
                <React.Fragment>
                    <Backdrop />
                    <Modal
                        title={selectedEvent.title}
                        onCancel={() => setSelectedEvent(null)}
                        cancelText={"Close"}
                        onConfirm={authContext.token ? ()=>onBookEvent(selectedEvent._id) : null}
                        confirmText={"Book"}
                    >
                        <h2>{selectedEvent.price + " $"} - {new Date(selectedEvent.date).toLocaleDateString()}</h2>
                        <p>{selectedEvent.description}</p>
                    </Modal>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default EventList