import { Types } from "mongoose";
import { User_Name_Type } from "../../global/interfaces";



export type Admin_Type = {
    user: Types.ObjectId,
    name: User_Name_Type,
    email: string,
    adminId: string,
}


export type Get_Admin_Type = {
    name: User_Name_Type,
    email: string,
    adminId: string,
}

export type Update_Admin_Type = {
    name?: User_Name_Type,
    adminId?: string,
}