import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
 

const router =Router()
router.post('/login', authControllers.credentialsLogin)
router.post('/refreshToken', authControllers.getNewAccessToken)



export const authRoutes= router