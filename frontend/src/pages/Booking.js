import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/auth-context';

import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/BookingList/BookingList';
import './Booking.css'
import Chart from '../components/BookingsChart/Chart';

function BookingPage() {
    const authContext = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [bookings, setBookings] = useState([])
    const mounted = useRef(false)
    const [outputType, setOutputType] = useState('list')

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
                            price
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

    const handleDeleteBooking = bookingId => {
        setIsLoading(true)
        const requestBody = {
            query: `
                mutation CancelBooking($id: ID!) {
                    cancelBooking(bookingId: $id){
                        _id
                        title
                    }
                }
            `,
            variables: {
                id: bookingId
            }
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
            setIsLoading(false)
            if (mounted) {
                console.log(resData);
                setBookings(bookings => bookings.filter(booking => booking._id !== bookingId))
            }
        }).catch(err => {
            console.error(err)
        })
    }

    const changeTabHandler = outputType => {
        if (outputType === 'list') {
            setOutputType('list')
        }
        else {
            setOutputType('chart')
        }
    }

    useEffect(() => {
        mounted.current = true
        fetchBookings()
        return () => {
            mounted.current = false
        }
    }, [])


    let content = <Spinner />
    if (!isLoading) {
        content = (
            <React.Fragment>
                <div className="bookings__nav">
                    <button
                        className={`bookings__nav-item ${outputType === 'list' && '--active'}`}
                        onClick={() => changeTabHandler('list')}>
                        List
                    </button>
                    <button
                        className={`bookings__nav-item ${outputType === 'chart' && '--active'}`}
                        onClick={() => changeTabHandler('chart')}>
                        Chart
                    </button>
                </div>
                {outputType === 'list'
                    ? <BookingList bookings={bookings} onCancelBooking={handleDeleteBooking} />
                    : <Chart bookings={bookings} />
                }
            </React.Fragment>
        )
    }

    return (
        <div className="bookings">
            {content}
        </div>
    )
}

export default BookingPage