import { z } from 'zod';

export const Zod_Faculty_Type = z.object({
  body: z.object({
    name: z.object({
      f_name: z.string(),
      m_name: z.string().optional(),
      l_name: z.string(),
    }),
    email: z.string().email(),
    facultyId: z.string(),
    department: z.enum(["CSE", "SWE", "BBA", "MCT", "CIS", "ENG"]),
  }),
});

export const Zod_UPDATE_Faculty_Type = z.object({
  body: z.object({
      name: z.object({
        f_name: z.string().optional(),
        m_name: z.string().optional(),
        l_name: z.string().optional(),
      }).optional(),
      facultyId: z.string().optional(),
      department: z.enum(["CSE", "SWE", "BBA", "MCT", "CIS", "ENG"]).optional(),
  })
});