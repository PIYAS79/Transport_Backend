import { Types } from "mongoose"



export type Semester_Type = {
    semester_code: number; // 20241; here first 4 digit is year and last 1 digit is sorted semester number in this year
    semester_name: string;
    semester_year: number;
    package_price: number;
    one_way_pass_price: number;
    created_by: Types.ObjectId; // user collection _id
    startMonth: number, // jan-1,feb-2,...dec-12
    endMonth: number, // jan-1,feb-2,...dec-12
    status: "PENDING" | "ACTIVE" | "EXPIRED" | "DELETED",
    isDeleted?: boolean,
    semester_color: string,
    deletedBy?: Types.ObjectId, // user collection _id
};


export type Semester_Update_Type = {
    semester_name?: string;
    package_price?: number;
    one_way_pass_price?: number;
    status?: "PENDING" | "ACTIVE" | "EXPIRED",
    semester_color: string,
};
