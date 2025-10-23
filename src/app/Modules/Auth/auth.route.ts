import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
 

const router =Router()
router.post('/login', authControllers.credentialsLogin)



export const authRoutes= router