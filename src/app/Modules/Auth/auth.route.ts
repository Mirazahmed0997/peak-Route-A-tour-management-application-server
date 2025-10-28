import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import passport from "passport";
import { profile } from "console";
 

const router =Router()
router.post('/login', authControllers.credentialsLogin)
router.post('/refreshToken', authControllers.getNewAccessToken)
router.post('/log-out', authControllers.logOut)
router.post('/resetPassword',verifyAuth(...Object.values(Role)), authControllers.resetPassword)
router.get("/google",async(req:Request,res: Response,next:NextFunction)=>{
    passport.authenticate("google",{scope:["profile","email"]})(req,res,next)
})

router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}),authControllers.googleCallBackControllers)



export const authRoutes= router