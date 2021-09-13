import React, { useContext, useEffect, useRef, useState } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import EventList from '../components/Events/EventList/EventList'
import Spinner from '../components/Spinner/Spinner';
import { AuthContext } from '../context/auth-context';
import makeRequest, { createEvent, getEvents } from '../graphql/queries'
import './Events.css'

function EventsPage() {
    const inputTitleRef = useRef(null)
    const inputDescRef = useRef(null)
    const inputPriceRef = useRef(null)
    const inputDateRef = useRef(null)
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState([])
    const authContext = useContext(AuthContext)
    const mounted = useRef(false)
    const [message, setMessage] = useState("")

    const createEventClickHandler = e => {
        e.preventDefault()
        setCreatingEvent(true)
    }

    const modalConfirmHandler = async e => {
        setCreatingEvent(false)
        const title = inputTitleRef.current.value
        const price = +inputPriceRef.current.value // trick to convert string to number fast
        const date = inputDateRef.current.value
        const description = inputDescRef.current.value

        if (
            title.trim().length === 0 ||
            date.trim().length === 0 ||
            price <= 0 ||
            description.trim().length === 0
        ) {
            return
        }

        const event = { title, description, price, date }

        try {
            const data = await makeRequest(authContext.token, createEvent(title, description, price, date))

            if (data.data.createEvent) {
                event._id = data.data.createEvent._id
                event.creator = {
                    _id: authContext.userId,
                }

                setEvents(events => [...events, event])
                setMessage('Event created')
            }

            if (data.errors) {
                setMessage(data.errors[0].message)
            }
        }
        catch (e) {
            setMessage('Problem with adding event')
        }
    }

    const fetchEvents = async () => {
        setIsLoading(true)

        const data = await makeRequest(authContext.token, getEvents())

        setEvents(data.data.events)
        setIsLoading(false)
    }

    const modalCancelHandler = e => {
        setCreatingEvent(false)
    }


    useEffect(() => {
        mounted.current = true
        fetchEvents()
        return () => {
            mounted.current = false
        }
    }, [])


    return (
        <div className="events">
            {creatingEvent && <Backdrop />}
            {
                creatingEvent &&
                <Modal
                    title="Title"
                    onCancel={modalCancelHandler}
                    onConfirm={modalConfirmHandler}
                >
                    <form className="form">
                        <div className="form__control">
                            <label htmlFor="title">title</label>
                            <input type="text" id="title" ref={inputTitleRef}></input>
                        </div>
                        <div className="form__control">
                            <label htmlFor="price">price</label>
                            <input type="number" id="price" ref={inputPriceRef}></input>
                        </div>
                        <div className="form__control">
                            <label htmlFor="date">date</label>
                            <input type="datetime-local" id="date" ref={inputDateRef}></input>
                        </div>
                        <div className="form__control">
                            <label htmlFor="description">description</label>
                            <textarea id="description" ref={inputDescRef}></textarea>
                        </div>
                    </form>
                </Modal>
            }
            {
                authContext.token &&
                <div className="events-control">
                    <p>Share your events</p>
                    <button className="btn" type="button" onClick={createEventClickHandler}>
                        Create Event
                    </button>
                </div>
            }
            {
                message &&
                <React.Fragment>
                    <Backdrop />
                    <Modal
                        title="Info"
                        confirmText="OK"
                        onConfirm={() => setMessage(null)}
                    >
                        <p>{message}</p>
                    </Modal>
                </React.Fragment>
            }
            {isLoading ?
                <Spinner className="events__spinner" />
                : <EventList events={events} onMessage={setMessage}
                />}
        </div>
    )
}

export default EventsPage