import express, { Router } from 'express';
import { Login, Logout, SignUp } from '../controllers/auth.controllers.js';

const authRouter = express(Router());

authRouter.post('/signup', SignUp);
authRouter.post('/login', Login);
authRouter.get('/logout', Logout);

export default authRouter;