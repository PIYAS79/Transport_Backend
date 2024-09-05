


import { z } from 'zod';

export const Zod_User_Type = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
        role: z.enum(["SUPER", "ADMIN", "STUDENT", "FACULTY"]),
        status: z.enum(["ACTIVE", "BLOCK", "EXPIRED"]),
        studentId: z.string(),
        department: z.enum(["CSE", "SWE", "BBA", "MCT", "CIS", "ENG"])

    })
});




