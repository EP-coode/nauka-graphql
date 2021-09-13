export const createEvent = (title, description, price, date) => ({
    query: `
                mutation CreateEvent($title: String!, $desc: String!, $price: Float!, $date: String!){
                    createEvent(eventInput: {title: $title, description: $desc, price: $price, date: $date}){
                        _id
                    }
                }
            `,
    variables: {
        title: title,
        desc: description,
        price: price,
        date: date
    }
})

export const getEvents = () => ({
    query: `
                query{
                    events{
                        _id
                        title
                        description
                        date
                        price
                        creator{
                            _id
                            email
                        }
                    }
                }
            `
})

export const bookEvent = eventId => ({
    query: `
                mutation BookEvent($id: ID!){
                    bookEvent(eventId: $id){
                        _id
                        createdAt
                        updatedAt
                    }
                }
            `,
    variables: {
        id: eventId
    }
})

export const getBookings = () => ({
    query: `
                query{
                    bookings{
                        _id
                        createdAt
                        event{
                            _id
                            title
                            date
                            price
                        }
                    }
                }
            `
})

export const cancelBooking = bookingID => ({
    query: `
                mutation CancelBooking($id: ID!) {
                    cancelBooking(bookingId: $id){
                        _id
                        title
                    }
                }
            `,
    variables: {
        id: bookingID
    }
})

export const login = (email, password) => ({
    query: `
                query Login($email: String!, $password: String!){
                    login(email: $email,password:$password){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
    variables: {
        email,
        password
    }
})

export const createUser = (email, password) => ({
    query: `
                mutation CreateUser($email: String!, $password: String!){
                    createUser(userInput: {email: $email, password: $password}){
                        _id
                        email
                    }
                }
            `,
    variables: {
        email,
        password
    }
})

const makeRequest = async (token, requestBody) => {
    const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.status !== 200 && response.status !== 201) {
        throw new Error('Fail')
    }

    const data = await response.json()

    return data
}

export default makeRequest