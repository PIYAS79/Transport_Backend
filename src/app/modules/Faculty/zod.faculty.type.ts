import { z } from 'zod';

export const Zod_Faculty_Type = z.object({
  body: z.object({
    name: z.object({
      f_name: z.string(),
      m_name: z.string().optional(),
      l_name: z.string(),
    }),
    email: z.string().email(),
    role: z.enum(["SUPER", "ADMIN", "STUDENT", "FACULTY"]),
    status: z.enum(["ACTIVE", "BLOCK", "EXPIRED"]),
    facultyId: z.string(),
    department: z.enum(["CSE", "SWE", "BBA", "MCT", "CIS", "ENG"]),
  }),
});

