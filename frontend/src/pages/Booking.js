import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/auth-context';

import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/BookingList/BookingList';
import './Booking.css'
import Chart from '../components/BookingsChart/Chart';
import makeRequest, { cancelBooking, getBookings } from '../graphql/queries';

function BookingPage() {
    const authContext = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [bookings, setBookings] = useState([])
    const mounted = useRef(false)
    const [outputType, setOutputType] = useState('list')

    const fetchBookings = async () => {
        setIsLoading(true)
        const data = await makeRequest(authContext.token, getBookings())

        if (mounted) {
            setBookings(data.data.bookings)
        }

        setIsLoading(false)
    }

    const handleDeleteBooking = async bookingId => {
        setIsLoading(true)
        const data = await makeRequest(authContext.token, cancelBooking(bookingId))

        if (mounted) {
            setBookings(bookings => bookings.filter(booking => booking._id !== bookingId))
        }

        setIsLoading(false)
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


    let content = <Spinner className="bookings_spinner"/>
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