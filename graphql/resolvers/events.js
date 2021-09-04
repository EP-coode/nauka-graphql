const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToIsoString } = require('../../helpers/date')
const { transformEvent } = require('./helpers')

module.exports = {
    events: async () => {
        const events = await Event.find()
        return events.map(event => transformEvent(event))
    },
    createEvent: async (args, req) => {

        if(!req.isAuth){
            throw new Error('Unauthenticated')
        }

        const { title, description, price, date } = args.eventInput
        const event = new Event({
            title: title,
            description: description,
            price: price,
            date: dateToIsoString(date),
            creator: req.userId // temp hardcode
        })

        let createdEvent = await event.save()

        const foundUser = await User.findById(req.userId) // temp hardcode

        if (!foundUser) {
            throw new Error('User not exists')
        }
        foundUser.createdEvents.push(event)
        await foundUser.save()

        return transformEvent(createdEvent)
    }
}