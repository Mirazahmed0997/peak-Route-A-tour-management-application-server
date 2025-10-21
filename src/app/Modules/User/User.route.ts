import { Router } from "express";
import { userControllers } from "./User.controller";


const router =Router()

router.post('/register', userControllers.createUser)

export const userRoutes= router