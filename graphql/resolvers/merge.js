const DataLoader = require('dataloader')

const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToIsoString } = require('../../helpers/date')

const eventLoader = new DataLoader((eventIds) => {
    return events(eventIds)
})

const events = async eventIds => {
    // dataloader potrzebuje tej samej kolejniosci danych wyjściowych co kolejność odpowiadającym
    // im indeksom wejściowych. Mongose nie gwarantuje tej kolejności
    const events = await Event.find({ _id: { $in: eventIds } })
    // const beg = new Date().getMilliseconds()
    // const sortedEvents = eventIds.map(id => {
    //     return events.find(event => event._id.toString() === id)
    // })
    // wbudowany sort jest szybszy pomimo gorszej złożoności
    events.sort((a, b) => {
        const z = a._id.toString();
        return eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
    })
    // console.log("Time: ", new Date().getMilliseconds() - beg, 'ms');
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
        createdEvents: () => eventLoader.loadMany(user._doc.createdEvents.map(e => e.toString()))
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