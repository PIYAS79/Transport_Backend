


import { z } from 'zod';

export const Zod_SemesterCardStack_Type = z.object({
    body: z.object({
        payment_amount: z.number(),
        route: z.enum(["MIRPUR <> DSC", "Tongi <> DSC", "Dhanmondi <> DSC", "Uttara <> DSC"]),
        email: z.string().email(),
        user: z.string().regex(/^[0-9a-fA-F]{24}$/),
        transaction_id: z.string(),
        semester_id: z.string().regex(/^[0-9a-fA-F]{24}$/),
        payedWith: z.string(),
        // status: z.enum(["PENDING", "WITHDRAW"]),
    })
});
export const Zod_SemesterCardStack_User_Withdraw_Type = z.object({
    body: z.object({
        status:z.boolean()
    })
});
// export const Zod_Req_Approve_Type = z.object({
//     body: z.object({
//         type:z.number().max(2).min(1), // 1=semester passout; 2=one way pass out
//     })
// });