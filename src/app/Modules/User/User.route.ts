import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./User.controller";
import { createUserZodSchema, updateUserZodSchema } from "./User.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../../errorHelper/AppError";
import { Role } from "./User.interface";
import { envVars } from "../../Config/env";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { multerUpload } from "../../Config/multer.config";





    

const router =Router()



router.post('/register',
    multerUpload.single("file"),
    // validateRequest(createUserZodSchema),
    userControllers.createUser)

// router.get('/AllUsers',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),userControllers.getAllUsers)
router.get('/AllUsers',userControllers.getAllUsers)
router.get('/userProfile',verifyAuth(...Object.values(Role)),userControllers.getUsersProfile)
router.patch('/:id', verifyAuth(...Object.values(Role)),multerUpload.single("file"),userControllers.updateUser)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),userControllers.deleteUser)

export const userRoutes= router