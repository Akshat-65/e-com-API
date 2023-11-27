import express from 'express';
import { UserController } from './user.controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signin',userController.signIn);
userRouter.post('/signup',userController.signUp);

export default userRouter;
