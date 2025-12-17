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
import cookieParser from "cookie-parser"
import passport from 'passport';
import expressSession  from 'express-session';
import './app/Config/passport'

const app= express();
app.use(cookieParser())
app.use(express.json())
app.set("trust proxy",1)
app.use(express.urlencoded({extended:true}))
app.use(cors({
    // origin:envVars.FRONTEND_URL,
    // credentials:true
}))


app.use(expressSession({
    secret:envVars.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())




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

