import { z } from 'zod';

export const Zod_One_Pass_Card_Type = z.object({
    body: z.object({
        user: z.string().regex(/^[0-9a-fA-F]{24}$/), // ObjectId as 24-character hex string
        cardType: z.enum(["One Way Pass Out"]),
        email: z.string().email(),
        route: z.enum(["MIRPUR <> DSC", "Tongi <> DSC", "Dhanmondi <> DSC", "Uttara <> DSC"]),
        amount: z.number(),
        transaction_id: z.string(),
        payedWith: z.string(),
    })
});


// expiredAt: z.date(),
// status: z.enum(["ACTIVE", "EXPIRED", "BLOCK"]),
// expiredBy: z.enum(["USER", "AUTO", "ADMIN"]).optional(),
// expiredConfirmBy: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(), // ObjectId as 24-character hex string