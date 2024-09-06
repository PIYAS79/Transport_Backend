import { Types } from "mongoose"



export type Card_Type = {
    user: Types.ObjectId,
    cardType: "Semester Pass Out" | "One Way Pass Out",
    email: string,
    status: "ACTIVE" | "EXPIRED" | "BLOCK",
    semesterId?: Types.ObjectId,
    route: "MIRPUR <> DSC" | "Tongi <> DSC" | "Dhanmondi <> DSC" | "Uttara <> DSC",
    amount: number,
    transaction_id: string,
    payedWith: string,
    expiredAt: Date,
    duraton: string,
    confirmedBy: Types.ObjectId | "AUTO",

    expiredBy?: "USER" | "AUTO" | "ADMIN",
    expiredConfirmBy?: Types.ObjectId,
}


export type Get_One_Pass_Card_Type = {
    user: Types.ObjectId,
    cardType: "One Way Pass Out",
    email: string,
    route: "MIRPUR <> DSC" | "Tongi <> DSC" | "Dhanmondi <> DSC" | "Uttara <> DSC",
    amount: number,
    transaction_id: string,
    payedWith: string,
    confirmedBy: Types.ObjectId | "AUTO",
}