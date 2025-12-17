"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const User_interface_1 = require("./User.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(1, "Name cannot be empty")
        .max(50, "Name cannot exceed 50 characters")
        .refine((val) => typeof val === "string", {
        message: "Name must be a string",
    }),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain at least one uppercase letter, one number, and one special character"),
    phone: zod_1.default.string()
        .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number").optional(),
    address: zod_1.default.string().optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(1, "Name cannot be empty")
        .max(50, "Name cannot exceed 50 characters")
        .refine((val) => typeof val === "string", {
        message: "Name must be a string",
    }).optional(),
    phone: zod_1.default.string()
        .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number").optional(),
    address: zod_1.default.string().optional(),
    role: zod_1.default.enum(Object.values(User_interface_1.Role)).optional(),
    isActive: zod_1.default.enum(Object.values(User_interface_1.isActive)).optional(),
    isDeleted: zod_1.default
        .boolean()
        .optional()
        .refine((val) => typeof val === "boolean" || val === undefined, {
        message: "IsDeleted must be true or false",
    }),
    isVerified: zod_1.default
        .boolean()
        .optional()
        .refine((val) => typeof val === "boolean" || val === undefined, {
        message: "IsVerified must be true or false",
    }),
});
//# sourceMappingURL=User.validation.js.map