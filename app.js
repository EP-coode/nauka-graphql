const express = require('express')
const { graphqlHTTP  } = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

app.use(express.json())

const events = ["bob's chalange", "yee", "test", "bannannana"]

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events
        },
        createEvent: (args) => {
            const eventName = args.name
            events.push(eventName)
            return eventName
        }
    },
    graphiql: true
})) 

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`);
})