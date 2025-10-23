import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./User.controller";
import { createUserZodSchema } from "./User.validation";
import { validateRequest } from "../../middlewares/validateRequest";





    

const router =Router()

router.post('/register',validateRequest(createUserZodSchema),userControllers.createUser)

router.get('/AllUsers', userControllers.getAllUsers)

export const userRoutes= router