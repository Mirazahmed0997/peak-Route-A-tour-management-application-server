"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDivisionZodSchema = exports.createDivisionZodSchema = void 0;
const zod_1 = require("zod");
exports.createDivisionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, "Name cannot be empty")
            .max(100, "Name cannot exceed 100 characters")
            .refine((v) => typeof v === "string", { message: "Name must be a string" }),
        slug: zod_1.z
            .string()
            .min(1, "Slug cannot be empty")
            .max(100, "Slug cannot exceed 100 characters")
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and URL-friendly (letters, numbers, hyphens)"),
        thumnail: zod_1.z
            .string()
            .url("Thumnail must be a valid URL")
            .optional(),
        description: zod_1.z
            .string()
            .max(1000, "Description cannot exceed 1000 characters")
            .optional(),
    }),
});
exports.updateDivisionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, "Name cannot be empty")
            .max(100, "Name cannot exceed 100 characters")
            .refine((v) => typeof v === "string", { message: "Name must be a string" })
            .optional(),
        slug: zod_1.z
            .string()
            .min(1, "Slug cannot be empty")
            .max(100, "Slug cannot exceed 100 characters")
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and URL-friendly (letters, numbers, hyphens)")
            .optional(),
        thumnail: zod_1.z
            .string()
            .url("Thumnail must be a valid URL")
            .optional(),
        description: zod_1.z
            .string()
            .max(1000, "Description cannot exceed 1000 characters")
            .optional(),
    }),
});
//# sourceMappingURL=Division.Validation.js.map