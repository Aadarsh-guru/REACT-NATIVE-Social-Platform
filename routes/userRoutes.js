import express from "express";
import { userRegisterController, userLoginController, userUpdateController } from "../controller/userController.js";
import requireSignIn from "../middlewares/authMiddleware.js";
const route = express.Router()

route.post('/register', userRegisterController)
route.post('/login', userLoginController)
route.put('/update-user', requireSignIn, userUpdateController)

export default route