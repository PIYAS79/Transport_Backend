import { Types } from "mongoose"



export type User_Type = {
    email: string,
    password: string,
    role: 'SUPER' | 'ADMIN' | 'STUDENT' | 'FACULTY',
    isPasswordChanged: boolean,
    status: 'ACTIVE' | 'BLOCK' | 'EXPIRED',
    passwordChangedAt: Date,
    user: Types.ObjectId,
}

export type Get_User_Type = {
    email: string,
    password: string,
    role: 'SUPER' | 'ADMIN' | 'STUDENT' | 'FACULTY',
    status: 'ACTIVE' | 'BLOCK' | 'EXPIRED',
    studentId:string,
    deaprtment:'CSE'|'SWE'|'BBA'|'MCT'|'CIS'|'ENG'
}