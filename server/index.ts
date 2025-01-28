import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoute from './routes/user.route';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/user", UserRoute);

export default app;