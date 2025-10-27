import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
 

const router =Router()
router.post('/login', authControllers.credentialsLogin)
router.post('/refreshToken', authControllers.getNewAccessToken)
router.post('/log-out', authControllers.logOut)



export const authRoutes= router