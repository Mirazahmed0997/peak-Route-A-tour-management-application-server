import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./User.controller";
import z from "zod";


const router =Router()

router.post('/register',async (req:Request,res:Response,next:NextFunction)=>
    {
        const createUserZodSchema=z.object({
                 name: z.string()
                .min(1, "Name cannot be empty")
                .max(50, "Name cannot exceed 50 characters")
                .refine((val) => typeof val === "string", {
                    message: "Name must be a string",
                }),

                 email: z.string().email(),
                     password: z.string().min(8, "Password must be at least 8 characters long")
                    .regex(
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                        "Password must contain at least one uppercase letter, one number, and one special character"
                    ),
                 phone: z.string()
                 .regex(
                        /^(?:\+8801|01)[3-9]\d{8}$/,
                        "Invalid Bangladeshi phone number"
                    ).optional(),
                 address: z.string().optional(),
        })

        req.body= await createUserZodSchema.parseAsync(req.body)
        next()

    } ,userControllers.createUser)
router.get('/AllUsers', userControllers.getAllUsers)

export const userRoutes= router