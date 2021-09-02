const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const moongose = require('mongoose')
const bcrypt = require('bcryptjs')

const Event = require('./models/event')
const User = require('./models/user')

const app = express()

app.use(express.json())

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find().then(events => {
                return events.map(e => {
                    return { ...e._doc }
                })
            }).catch(err => {
                throw err
            })
        },
        createEvent: args => {
            const { title, description, price, date } = args.eventInput
            const event = new Event({
                title: title,
                description: description,
                price: price,
                date: new Date(),
                creator: '61308f620344414c855b4cb0' // tamp hardcode
            })

            let createdEvent = null

            return event.save().then(result => {
                createdEvent = { ...result._doc }
                return User.findById('61308f620344414c855b4cb0')
            }).then(user => {
                if(!user)
                    throw new Error('User not exists')
                user.createdEvents.push(event)
                return user.save()
            }).then(result => {
                return createdEvent
            }).catch(err => {
                console.log(err);
                throw err
            })
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
    },
    graphiql: true
}))

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env


moongose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`)
    .then(() => {
        app.listen(3000, () => {
            console.log(`Listening on http://localhost:3000`);
        })
    }).catch(err => {
        console.log(err);
    })