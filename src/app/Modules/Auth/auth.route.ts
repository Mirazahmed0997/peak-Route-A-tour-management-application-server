import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
 

const router =Router()
router.post('/login', authControllers.credentialsLogin)
router.post('/refreshToken', authControllers.getNewAccessToken)
router.post('/log-out', authControllers.logOut)
router.post('/resetPassword',verifyAuth(...Object.values(Role)), authControllers.resetPassword)



export const authRoutes= router