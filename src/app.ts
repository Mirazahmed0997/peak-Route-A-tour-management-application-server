import {Server} from 'http';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { userRoutes } from './app/Modules/User/User.route';
import cors from "cors"
import { router } from './app/routes';
import { error } from 'console';
import { envVars } from './app/Config/env';
import { globalError } from './app/middlewares/GlobalErrorHandler';
import httpStatus from "http-status-codes"
import notFound from './app/middlewares/NotFound';

const app= express();
app.use(express.json())
app.use(cors())




app.use('/api/v1', router)




app.get('/',(req:Request,res:Response)=>
{
    res.status(200).json({
        message: "welcome To Tour management"
    })
})

app.use(globalError)

app.use(notFound)

export default app;

