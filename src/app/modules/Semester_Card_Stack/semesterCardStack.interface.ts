import { Types } from "mongoose"



export type SemesterCardStack_Type = {
    payment_amount: number,
    email: string,
    route: "MIRPUR <> DSC" | "Tongi <> DSC" | "Dhanmondi <> DSC" | "Uttara <> DSC",
    user: Types.ObjectId,
    transaction_id: string,
    semester_id: Types.ObjectId,
    status:"PENDING"|"WITHDRAW"
    payedWith: string,
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

// export type Get_Approve_Type = {
//     cardType:number,
// }