import { z } from 'zod';


export const Zod_Login_Type = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    }),
});

export const Zod_Change_Password_Type = z.object({
    body: z.object({
        old_password: z.string(),
        new_password: z.string()
    }),
});

export const Zod_Forget_Password_Type = z.object({
    body: z.object({
        email: z.string(),
    }),
});

export const Zod_Reset_Password_Type = z.object({
    body: z.object({
        email: z.string(),
        new_password: z.string()
    }),
});

export const Zod_Refresh_Token_Type = z.object({
    cookies: z.object({
        refreshToken: z.string()
    })
})