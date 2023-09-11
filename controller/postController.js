import Post from "../modals/postModel.js";


export const createPostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            res.status(500).send({ success: false, message: 'provide all feilds.' })
        }
        const post = await Post.create({ title, description, postedBy: req.userId })
        return res.status(201).send({ success: true, message: 'post created successfully.', post })
    } catch (error) {
        return res.status(500).json({ message: 'Error while creating the post.', error, success: false })
    }
}

export const getAllPostController = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('postedBy', '_id name').sort({ updatedAt: -1 })
        return res.status(200).send({ success: true, message: 'posts fetched successfully.', posts })
    } catch (error) {
        return res.status(500).json({ message: 'Error while getting the post.', error, success: false })
    }
}

export const getUserPostsController = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req?.userId }).populate('postedBy', '_id name').sort({ updatedAt: -1 })
        return res.status(200).send({ success: true, message: 'user posts fetched successfully.', posts })
    } catch (error) {
        return res.status(500).json({ message: 'Error while getting the user post.', error, success: false })
    }
}

export const deletePostController = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        return res.status(200).send({ success: true, message: 'user post deleted successfully.', post })
    } catch (error) {
        return res.status(500).json({ message: 'Error while deleting the user post.', error, success: false })
    }
}

export const updatePostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.id, { title, description })
        return res.status(200).send({ success: true, message: 'post updated successfully.', post })
    } catch (error) {
        return res.status(500).json({ message: 'Error while updating the post.', error, success: false })
    }
}