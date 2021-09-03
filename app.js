const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const moongose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')


const app = express()

app.use(express.json())


app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
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