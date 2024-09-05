import { Model } from "mongoose"


export type User_Type = {
    email: string,
    password: string,
    role: 'SUPER' | 'ADMIN' | 'STUDENT' | 'FACULTY',
    isPasswordChanged: boolean,
    status: 'ACTIVE' | 'BLOCK' | 'EXPIRED',
    passwordChangedAt?: Date,
}



export interface User_Custom_Static_Method extends Model<User_Type>{
    isTokenValid(tokenIAt:number,PassUpAt:Date):boolean
}