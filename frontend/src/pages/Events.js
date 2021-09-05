import React, { useRef, useState } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Events.css'

function EventsPage() {
    const inputTitle = useRef(null)
    const inputDesc = useRef(null)
    const inputPrice = useRef(null)
    const inputDate = useRef(null)
    const [creatingEvent, setCreatingEvent] = useState(false)

    const createEventClickHandler = e => {
        e.preventDefault()
        setCreatingEvent(true)
    }

    const modalConfirmHandler = e => {
        setCreatingEvent(false)
    }

    const modalCancelHandler = e => {
        setCreatingEvent(false)
    }

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
                    {/* <form className="form">
                    <div className="form__control">
                        <label htmlFor="title">E-mail</label>
                        <input type="text" id="title" ref={inputTitle}></input>
                    </div>
                    <div className="form__control">
                        <label htmlFor="description">password</label>
                        <input type="text" id="description" ref={inputDesc}></input>
                    </div>
                    <div className="form__control">
                        <label htmlFor="price">password</label>
                        <input type="number" id="price" ref={inputPrice}></input>
                    </div>
                    <div className="form__control">
                        <label htmlFor="date">password</label>
                        <input type="date" id="date" ref={inputDate}></input>
                    </div>
                </form> */}
                    modal content
                </Modal>
            }
            <button className="btn" type="button" onClick={createEventClickHandler}>
                Create Event
            </button>

        </div>
    )
}

export default EventsPage