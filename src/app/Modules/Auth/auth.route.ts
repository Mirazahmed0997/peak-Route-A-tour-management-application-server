import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import passport from "passport";
import { profile } from "console";
import { envVars } from "../../Config/env";
 

const router =Router()
router.post('/login', authControllers.credentialsLogin)
router.post('/refreshToken', authControllers.getNewAccessToken)
router.post('/log-out', authControllers.logOut)
router.post('/resetPassword',verifyAuth(...Object.values(Role)), authControllers.resetPassword)
router.post('/setPassword',verifyAuth(...Object.values(Role)), authControllers.setPassword)
router.post('/changePassword',verifyAuth(...Object.values(Role)), authControllers.changePassword)




router.get("/google",async(req:Request,res: Response,next:NextFunction)=>{
    const redirect= req.query.redirect || "/"
    passport.authenticate("google",{scope:["profile","email"], state:redirect as string})(req,res,next)
})

router.get("/google/callback",passport.authenticate("google",{failureRedirect:`${envVars.FRONTEND_URL}/login?error=There is Some issues with your account. Please contact with our support team`}),authControllers.googleCallBackControllers)



export const authRoutes= router