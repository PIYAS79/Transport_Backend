

import { z } from "zod";

export const Zod_Semester_Type = z.object({
    body: z.object({
        semester_name: z.string(),
        semester_year: z.number(),
        package_price: z.number(),
        one_way_pass_price: z.number(),
        semester_color: z.string(),
        created_by: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"), // MongoDB ObjectId format
        startMonth: z.number().max(12).min(1), // jan-1,feb-2,...dec-12
        endMonth: z.number().max(12).min(1), // jan-1,feb-2,...dec-12
    })
});

export const Zod_Semester_Update_Type = z.object({
    body: z.object({
        semester_name: z.string().optional(),
        package_price: z.number().optional(),
        one_way_pass_price: z.number().optional(),
        status: z.enum(["PENDING", "ACTIVE", "EXPIRED"]).optional(),
        semester_color: z.string()
    })
});
