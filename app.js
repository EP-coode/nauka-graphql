const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res, next) => {
    
    res.send('Hello there yee')
})

app.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`);
})