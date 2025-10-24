import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./User.controller";
import { createUserZodSchema } from "./User.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../../errorHelper/AppError";
import { Role } from "./User.interface";
import { envVars } from "../../Config/env";
import { verifyAuth } from "../../middlewares/CheckAuth";





    

const router =Router()



router.post('/register',validateRequest(createUserZodSchema),userControllers.createUser)

router.get('/AllUsers',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),userControllers.getAllUsers)

export const userRoutes= router