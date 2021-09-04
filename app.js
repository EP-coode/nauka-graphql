const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const moongose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')


const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    if(req.method === "OPTIONS"){
        return res.sendStatus(200)
    }
    
    next()
})

app.use(isAuth)

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