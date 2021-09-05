import React, { useRef } from 'react';

function EventsPage() {
    const inputTitle = useRef(null)
    const inputDesc = useRef(null)
    const inputPrice = useRef(null)
    const inputDate = useRef(null)

    const handleFormSubit = e => {
        e.preventDefault()
    }

    return (
        <div className="events">
            <h1>
                Events page
            </h1>
            <form className="form">
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
                <div className="form__control">
                    <button className="btn" type="button" onClick={handleFormSubit}>
                        Create Event
                    </button>
                </div>
            </form>

        </div>
    )
}

export default EventsPage