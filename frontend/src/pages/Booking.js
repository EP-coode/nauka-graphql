import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/auth-context';

import Spinner from '../components/Spinner/Spinner';

function BookingPage() {
    const authContext = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [bookings, setBookings] = useState([])
    const mounted = useRef(false)

    const fetchBookings = () => {
        setIsLoading(true)
        const requestBody = {
            query: `
                query{
                    bookings{
                        _id
                        createdAt
                        event{
                            _id
                            title
                            date
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
            if (mounted) {
                console.log(resData);
                setBookings(resData.data.bookings)
                setIsLoading(false)
            }
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        mounted.current = true
        fetchBookings()
        return () => {
            mounted.current = false
        }
    }, [])

    const bookingsElem = bookings.map(booking => (
        <li key={booking._id}>
            {new Date(booking.createdAt).toLocaleDateString()} - {booking.event.title}
        </li>
    ))

    return (
        <React.Fragment>
            {isLoading ? <Spinner />
                : <div className="booking">
                    <h1>Booking Page</h1>
                    <ul>{bookingsElem}</ul>
                    {isLoading && "Loading..."}
                </div>}
        </React.Fragment>
    )
}

export default BookingPage