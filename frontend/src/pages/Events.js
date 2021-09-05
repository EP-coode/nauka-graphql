import React, { useContext, useEffect, useRef, useState } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Events.css'
import { AuthContext } from '../context/auth-context';

function EventsPage() {
    const inputTitleRef = useRef(null)
    const inputDescRef = useRef(null)
    const inputPriceRef = useRef(null)
    const inputDateRef = useRef(null)
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [events, setEvents] = useState([])
    const authContext = useContext(AuthContext)

    const createEventClickHandler = e => {
        e.preventDefault()
        setCreatingEvent(true)
    }

    const modalConfirmHandler = e => {
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

        const event = { title, price, date, description }

        const requestBody = {
            query: `
                mutation{
                    createEvent(eventInput: {title: "${title}",description:"${description}",price: ${price}, date: "${date}"}){
                        _id
                    }
                }
            `
        }

        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authContext.token}`
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Fail')
            }
            return res.json()
        }).then(resData => {
            console.log(resData.data.events);
        }).catch(err => {
            console.error(err)
        })
    }

    const fetchEvents = () => {
        const requestBody = {
            query: `
                query{
                    events{
                        _id
                        title
                        description
                        date
                        price
                        creator{
                            _id
                            email
                        }
                    }
                }
            `
        }

        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authContext.token}`
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Fail')
            }
            return res.json()
        }).then(resData => {
            console.log(resData);
            setEvents(resData.data.events)
            debugger
        }).catch(err => {
            console.error(err)
        })
    }

    const modalCancelHandler = e => {
        setCreatingEvent(false)
    }

    useEffect(fetchEvents, [])

    const eventList = events.map(event => (
        <li className="events__list-item" key={event._id}>
            {event.title}
        </li>
    ))

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
                            <label htmlFor="title">E-mail</label>
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
            <ul className="events__list">
                {eventList}
            </ul>

        </div>
    )
}

export default EventsPage