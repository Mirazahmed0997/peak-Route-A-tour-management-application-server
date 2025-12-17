import z from "zod";
import { isActive, Role } from "./User.interface";


export const createUserZodSchema=z.object({
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


        

export const updateUserZodSchema=z.object({
                 name: z.string()
                .min(1, "Name cannot be empty")
                .max(50, "Name cannot exceed 50 characters")
                .refine((val) => typeof val === "string", {
                    message: "Name must be a string",
                }).optional(),

                   
                 phone: z.string()
                 .regex(
                        /^(?:\+8801|01)[3-9]\d{8}$/,
                        "Invalid Bangladeshi phone number"
                    ).optional(),
                 address: z.string().optional(),


                 role:z.enum(Object.values(Role) as [string]) .optional(),
                 isActive:z.enum(Object.values(isActive) as [string]) .optional(),
               
               
                 isDeleted: z
                .boolean()
                .optional()
                .refine((val) => typeof val === "boolean" || val === undefined, {
                    message: "IsDeleted must be true or false",
                }),

              
              
                isVerified: z
                .boolean()
                .optional()
                .refine((val) => typeof val === "boolean" || val === undefined, {
                    message: "IsVerified must be true or false",
                }),



        })