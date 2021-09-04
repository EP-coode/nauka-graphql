const Event = require('../../models/event')
const Booking = require('../../models/booking')
const { transformBooking, transformEvent } = require('./helpers')

module.exports = {
    bookings: async () => {
        const bookings = await Booking.find()
        return bookings.map(booking => transformBooking(booking))
    },
    bookEvent: async args => {
        const fetchedID = await Event.findOne({ _id: args.eventId })
        const booking = new Booking({
            user: '61308f620344414c855b4cb0', // temp hardcode
            event: fetchedID
        })

        const result = await booking.save()

        return transformBooking(result)
    },
    cancelBooking: async args => {
        const booking = await Booking.findById(args.bookingId).populate('event')
        const event = transformEvent(booking.event)
        await Booking.deleteOne({ _id: args.bookingId })
        return event
    }
}