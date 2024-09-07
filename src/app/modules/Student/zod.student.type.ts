import { z } from 'zod';

export const Zod_Student_Type = z.object({
  body: z.object({
    name: z.object({
      f_name: z.string(),
      m_name: z.string().optional(),
      l_name: z.string(),
    }),
    email: z.string().email(),
    studentId: z.string(),
    department: z.enum(["CSE", "SWE", "BBA", "MCT", "CIS", "ENG"]),
  }),
});

export const Zod_UPDATE_Student_Type = z.object({
  body: z.object({
      name: z.object({
        f_name: z.string().optional(),
        m_name: z.string().optional(),
        l_name: z.string().optional(),
      }).optional(),
      studentId: z.string().optional(),
      department: z.enum(["CSE", "SWE", "BBA", "MCT", "CIS", "ENG"]).optional(),
  })
});