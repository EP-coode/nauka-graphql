const auth = require('./auth')
const booking = require('./booking')
const events = require('./events')

const rootResolver = {
    ...auth,
    ...booking,
    ...events
}

module.exports = rootResolver