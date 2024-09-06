import { Types } from "mongoose"



export type SemesterCardStack_Type = {
    payment_amount: number,
    route: "MIRPUR <> DSC" | "Tongi <> DSC" | "Dhanmondi <> DSC" | "Uttara <> DSC",
    email: string,
    user: Types.ObjectId,
    transaction_id: string,
    semester_id: Types.ObjectId,
    payedWith: string,
    status:"PENDING"|"WITHDRAW"
}




export type GET_SemesterCardStack_Type = {
    payment_amount: number,
    route: "MIRPUR <> DSC" | "Tongi <> DSC" | "Dhanmondi <> DSC" | "Uttara <> DSC",
    email: string,
    user: Types.ObjectId,
    transaction_id: string,
    semester_id: Types.ObjectId,
    payedWith: string,
}