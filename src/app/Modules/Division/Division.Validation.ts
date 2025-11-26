

import { z } from "zod";


export const createDivisionZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name cannot be empty")
      .max(100, "Name cannot exceed 100 characters")
      .refine((v) => typeof v === "string", { message: "Name must be a string" }),

    slug: z
      .string()
      .min(1, "Slug cannot be empty")
      .max(100, "Slug cannot exceed 100 characters")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and URL-friendly (letters, numbers, hyphens)"),

    thumnail: z
      .string()
      .url("Thumnail must be a valid URL")
      .optional(),

    description: z
      .string()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),
  }),
});




export const updateDivisionZodSchema = z.object({
    body: z.object({
      name: z
        .string()
        .min(1, "Name cannot be empty")
        .max(100, "Name cannot exceed 100 characters")
        .refine((v) => typeof v === "string", { message: "Name must be a string" })
        .optional(),
  
      slug: z
        .string()
        .min(1, "Slug cannot be empty")
        .max(100, "Slug cannot exceed 100 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and URL-friendly (letters, numbers, hyphens)")
        .optional(),
  
      thumnail: z
        .string()
        .url("Thumnail must be a valid URL")
        .optional(),
  
      description: z
        .string()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),
    }),
  });
