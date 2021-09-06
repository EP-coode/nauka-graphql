const DataLoader = require('dataloader')

const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToIsoString } = require('../../helpers/date')

const eventLoader = new DataLoader((eventIds) => {
    return events(eventIds)
})

const events = async eventIds => {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => transformEvent(event))
}

const userLoader = new DataLoader(userIds => {
    return User.find({ _id: { $in: userIds } });
});

const userByID = async userID => {
    //const user = await User.findOne({_id: userID})
    // const user = await userLoader.load(userID) // pamietać to obiekt
    const user = await userLoader.load(userID.toString()) // to id w postaci stringa

    return {
        ...user._doc,
        password: null,
        createdEvents: () => eventLoader.loadMany(user._doc.createdEvents.map(e=>e.toString()))
    }
}

const transformBooking = booking => {
    return {
        ...booking._doc,
        event: () => eventLoader.load(booking._doc.event.toString()),
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

module.exports = { transformEvent, transformBooking }