import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required.']
    },
    description: {
        type: String,
        required: [true, 'description is required.']
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const Post = mongoose.model('post', postSchema)

export default Post;

