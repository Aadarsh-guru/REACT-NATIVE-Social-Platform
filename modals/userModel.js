import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required.'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required.'],
        trim: true,
        min: 4,
        max: 16
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true })

const User = mongoose.model('user', userSchema)

export default User;