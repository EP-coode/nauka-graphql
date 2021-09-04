const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')


module.exports = {
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
    },
    login: async ({ email, password }) => {

        let user = await User.findOne({ email: email })

        if (!user) {
            throw new Error('User does not exist or password is wrong')
        }

        const passwordCorrect = await bcrypt.compare(password, user.password)

        if (!passwordCorrect) {
            throw new Error('User does not exist or password is wrong')
        }

        const tokenExpiration = 1

        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, process.env.SECRET_KEY,
        {
            expiresIn: `${tokenExpiration}h`
        })

        return {
            userId: user.id,
            token: token,
            tokenExpiration: tokenExpiration
        }
    }
}