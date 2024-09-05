import { Types } from "mongoose";
import { User_Name_Type } from "../../global/interfaces";



export type Student_Type = {
    user: Types.ObjectId,
    name: User_Name_Type,
    email: string,
    studentId: string,
    department: 'CSE' | 'SWE' | 'BBA' | 'MCT' | 'CIS' | 'ENG' 
}


export type Get_Student_Type = {
    name: User_Name_Type,
    email: string,
    studentId: string,
    department: 'CSE' | 'SWE' | 'BBA' | 'MCT' | 'CIS' | 'ENG' 
}