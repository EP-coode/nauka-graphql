const bcrypt = require('bcryptjs')

const Event = require('../../models/event')
const User = require('../../models/user')


const events = async eventIds => {

    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            }
        })
    }
    catch(err){
        throw err
        // future...
    }
    

}

const user = async userID => {
    const user = await User.findById(userID)

    return { 
        ...user._doc, 
        password: null, 
        createdEvents: events.bind(this, user._doc.createdEvents) 
    }
}

module.exports = {
    events: async () => {
        const events = await Event.find()
        return events.map(e => {
            return {
                ...e._doc,
                date: new Date(e._doc.date).toISOString(),
                creator: user.bind(this, e._doc.creator)
            }
        })
    },
    createEvent: async args => {
        const { title, description, price, date } = args.eventInput
        const event = new Event({
            title: title,
            description: description,
            price: price,
            date: new Date(date).toISOString(),
            creator: '61308f620344414c855b4cb0' // temp hardcode
        })

        let createdEvent = await event.save()
        
        const foundUser = await User.findById('61308f620344414c855b4cb0') // temp hardcode

        if (!foundUser) {
            throw new Error('User not exists')
        }
        foundUser.createdEvents.push(event)
        await foundUser.save()

        return { ...createdEvent._doc, creator: user.bind(this, createdEvent._doc.creator) }
    },
    createUser: async args => {
        const { email, password } = args.userInput

        let user = await User.findOne({ email: email })
        if (user) {
            throw new Error('User already exist')
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        user = new User({
            email: email,
            password: hashedPassword
        })

        const result = await user.save()
        return { ...result._doc, password: null }
    }
}