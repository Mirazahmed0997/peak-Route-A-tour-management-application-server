import {Server} from 'http';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { userRoutes } from './app/Modules/User/User.route';
import cors from "cors"

const app= express();
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRoutes)

app.get('/',(req:Request,res:Response)=>
{
    res.status(200).json({
        message: "welcome To Tour managment"
    })
})

export default app;

