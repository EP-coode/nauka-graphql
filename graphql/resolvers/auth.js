const bcrypt = require('bcryptjs')

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
}