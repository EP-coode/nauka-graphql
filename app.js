const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const moongose = require('mongoose')

const Event = require('./models/event')

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

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
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
                    return {...e._doc}
                })
            }).catch(err => {
                throw err
            })
        },
        createEvent: (args) => {
            const { title, description, price, date } = args.eventInput
            const event = new Event({
                title: title,
                description: description,
                price: price,
                date: new Date()
            })

            return event.save().then(result => {
                console.log(result);
                return { ...result._doc }
            }).catch(err => {
                console.log(err);
                throw err
            })
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