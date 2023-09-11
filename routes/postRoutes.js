import express from "express";
import { createPostController, getAllPostController, getUserPostsController, deletePostController, updatePostController } from "../controller/postController.js";
import requireSignIn from "../middlewares/authMiddleware.js";
const route = express.Router()

route.post('/create-post', requireSignIn, createPostController)
route.get('/get-all-posts', getAllPostController)
route.get('/get-user-posts', requireSignIn, getUserPostsController)
route.delete('/delete-post/:id', requireSignIn, deletePostController)
route.put('/post-update/:id', requireSignIn, updatePostController)


export default route