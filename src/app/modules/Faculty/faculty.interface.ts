import { Types } from "mongoose";
import { User_Name_Type } from "../../global/interfaces";



export type Faculty_Type = {
    user: Types.ObjectId,
    name: User_Name_Type,
    email: string,
    facultyId: string,
    department: 'CSE' | 'SWE' | 'BBA' | 'MCT' | 'CIS' | 'ENG' 
}


export type Get_Faculty_Type = {
    name: User_Name_Type,
    email: string,
    facultyId: string,
    department: 'CSE' | 'SWE' | 'BBA' | 'MCT' | 'CIS' | 'ENG' 
}