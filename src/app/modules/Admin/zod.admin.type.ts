import { z } from 'zod';

export const Zod_Admin_Type = z.object({
    body: z.object({
        name: z.object({
            f_name: z.string(),
            m_name: z.string().optional(),
            l_name: z.string(),
        }),
        email: z.string().email(),
        adminId: z.string(),
    }),
});


export const Zod_UPDATE_Admin_Type = z.object({
    body: z.object({
        name: z.object({
          f_name: z.string().optional(),
          m_name: z.string().optional(),
          l_name: z.string().optional(),
        }).optional(),
        adminId: z.string().optional(),
    })
  });