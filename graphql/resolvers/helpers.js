const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToIsoString } = require('../../helpers/date')

const transformBooking = booking => {
    return {
        ...booking._doc,
        event: eventByID.bind(this, booking._doc.event),
        user: userByID.bind(this, booking._doc.user),
        createdAt: dateToIsoString(booking._doc.createdAt),
        updatedAt: dateToIsoString(booking._doc.updatedAt)
    }
}

const transformEvent = event => {
    return {
        ...event._doc,
        date: dateToIsoString(event._doc.date),
        creator: userByID.bind(this, event._doc.creator)
    }
}

const events = async eventIds => {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => transformEvent(event))
}

const eventByID = async eventID => {
    const event = await Event.findById(eventID)

    return {
        ...event._doc,
        date: dateToIsoString(event._doc.date),
        creator: userByID.bind(this, event.creator)
    }
}

const userByID = async userID => {
    const user = await User.findById(userID)

    return {
        ...user._doc,
        password: null,
        createdEvents: events.bind(this, user._doc.createdEvents)
    }
}

module.exports = { transformEvent, transformBooking }