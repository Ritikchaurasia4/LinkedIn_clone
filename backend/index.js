import express from 'express';
const app = express();

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

import cors from 'cors';
import userRouter from './routes/user.routes.js';
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

const port = process.env.PORT || 5000;

app.use(express.json());  
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
});