import express from 'express'
import { userLogin, userRegister } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.post('/userregister',userRegister)
userRouter.post('/userlogin',userLogin)

export {userRouter}