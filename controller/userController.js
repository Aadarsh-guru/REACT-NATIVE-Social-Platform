import User from '../modals/userModel.js';
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken';

export const userRegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(200).send({ message: 'name, email, password are required.', success: false })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).send({ message: 'user already exist. please login', success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
        return res.status(201).send({ message: 'user registered successfully.', success: true, user })
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false })
    }
}

export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ message: 'Email, Password are required', success: false })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(200).json({ message: 'invalid login credentials.', success: false })
        }
        const match = await bcrypt.compare(password, user?.password)
        if (!match) {
            return res.status(200).json({ message: 'invalid login credentials.', success: false })
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.status(200).json({ message: 'User Logged In Successfully.', success: true, token, user })
    } catch (error) {
        return res.status(500).json({ message: 'Error while login the user.', error, success: false })
    }
}


export const userUpdateController = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const user = await User.findOne({ email: email })
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined
        const updateUser = await User.findByIdAndUpdate(user?._id, { name: name || user.name, password: hashedPassword || user.password }, { new: true })
        res.status(200).send({ success: true, message: 'Profile Updated Please Login', updateUser })
    } catch (error) {
        return res.status(500).json({ message: 'Error while updating the user.', error, success: false })
    }
}