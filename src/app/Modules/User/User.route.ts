import { Router } from "express";
import { userControllers } from "./User.controller";


const router =Router()

router.post('/register', userControllers.createUser)
router.get('/AllUsers', userControllers.getAllUsers)

export const userRoutes= router