const Event = require('../../models/event')
const Booking = require('../../models/booking')
const { transformBooking, transformEvent } = require('./merge')

module.exports = {
    bookings: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }

        const bookings = await Booking.find({user: req.userId})
        return bookings.map(booking => transformBooking(booking))
    },
    bookEvent: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }

        const fetchedID = await Event.findOne({ _id: args.eventId, user: req.userId})
        const booking = new Booking({
            user: req.userId, // temp hardcode
            event: fetchedID
        })

        const result = await booking.save()

        return transformBooking(result)
    },
    cancelBooking: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }

        const booking = await Booking.findById(args.bookingId).populate('event')
        const event = transformEvent(booking.event)
        await Booking.deleteOne({ _id: args.bookingId })
        return event
    }
}