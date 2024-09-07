import httpStatus from "http-status";
import Final_App_Error from "../../class/Final.app.error";
import { User_Model } from "../User/user.model"
import { Semester_Type, Semester_Update_Type } from "./semester.interface"
import { Semester_Model } from "./semester.model";
import { generateSemesterCode, isOverlappingSemester } from "./semester.utils";
import { JwtPayload } from "jsonwebtoken";
import Query_Builder from "../../class/Query.builder";

// create semester sevice
const Create_Semester_Service = async (data: Semester_Type) => {
    // Find the admin user
    const admin = await User_Model.findById(data.created_by);
    if (!admin) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Admin not found in the DB.");
    }

    // Check the role
    if (admin.role !== "ADMIN" && admin.role !== "SUPER") {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is not authorized to create a semester *");
    }

    // check if the end and start month pattern is ok or not 
    if (data.startMonth === data.endMonth || data.startMonth > data.endMonth) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "Start month and end month pattern is not ok *");
    }

    // Check for overlapping semesters
    const isOverlapped = await isOverlappingSemester(data.startMonth, data.endMonth, data.semester_year, data.semester_name);
    if (isOverlapped) {
        throw new Final_App_Error(httpStatus.CONFLICT, `Semester overlap with an existing semester, Check Semester_name, Start & End month *`);
    }

    // Generate the semester code
    const semester_code = await generateSemesterCode(data.semester_year);

    // Convert startMonth and endMonth to numbers
    const newSemester: Semester_Type = {
        ...data,
        semester_code: Number(semester_code),
        startMonth: data.startMonth, // Store as number
        endMonth: data.endMonth, // Store as number
    };

    // Save the new semester to the database
    const newSemesterData = await Semester_Model.create(newSemester);

    return newSemesterData;
};

// update semester service
// *you cant chnage semester_name after activate the semester
// * you can update only 5 field (semester_name, package_price, one_way_pass_price, status & semester_color)
const Semester_Update_Service = async (data: Semester_Update_Type, semesterId: string, tokendata: JwtPayload) => {
    // Find the admin user by token email
    const admin = await User_Model.findOne({ email: tokendata.email });
    if (!admin) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Admin not found in the DB.");
    }

    // Check the role
    if (admin.role !== "ADMIN" && admin.role !== "SUPER") {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is not authorized to create a semester *");
    }

    // check the semester is exist or not 
    const semester = await Semester_Model.findById(semesterId);
    if (!semester) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Semester Not Found *");
    }
    // is semester is deleted by admin 
    if (semester.isDeleted) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, `Semester is Deleted by Authority`)
    }
    // *you cant chnage semester_name after activate the semester
    if (semester.status === "ACTIVE") {
        // *you cant chnage semester_name after activate the semester
        if (data.semester_name && data.semester_name !== semester.semester_name) {
            throw new Final_App_Error(httpStatus.BAD_REQUEST, "You cant update semester name after activate the semester *");
        }
    }


    // you can update only 4 property 
    if (data.one_way_pass_price || data.package_price || data.semester_name || data.status || data.semester_color) {
        // if all ok then update semester 
        const remainingProperties: Semester_Update_Type = {
            ...data
        }
        const result = await Semester_Model.findByIdAndUpdate({ _id: semesterId }, remainingProperties, { new: true });
        return result;
    } else {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "You can update only semester_name, package_price, one_way_pass_price, and semester status")
    }
}

// delete semester service 
const Semester_Delete_Service = async (semesterId: string, tokendata: JwtPayload) => {
    // Find the admin user by token email
    const admin = await User_Model.findOne({ email: tokendata.email });
    if (!admin) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Admin not found in the DB.");
    }

    // Check the role
    if (admin.role !== "ADMIN" && admin.role !== "SUPER") {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is not authorized to create a semester *");
    }

    // check the semester is exist or not 
    const semester = await Semester_Model.findById(semesterId);
    if (!semester) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Semester Not Found *");
    }

    // change isDeleted, status=DELETED, and 
    const result = await Semester_Model.findOneAndUpdate({ _id: semesterId },
        {
            isDeleted: true,
            status: "DELETED",
            deletedBy: admin._id
        },
        { new: true })

    return result;
}


// get all semester services 
const Get_All_Semester_Service = async (query: Record<string, unknown>) => {

    const partialTags = ['semester_year', 'package_price', 'one_way_pass_price','startMonth','endMonth','status','semester_color'];
    const semesterInstance = new Query_Builder(Semester_Model.find().populate('created_by'), query)
        .searchQuery(partialTags)
        .fieldQuery()
        .filterQuery()
        .sortQuery()
        .pageQuery()

    const result = await semesterInstance.modelQuery;
    const meta = await semesterInstance.countTotalMeta();
    return { result, meta }
}

// get one semester services 
const Get_One_Semester_Service = async (semesterId:string) => {

    const semester = await Semester_Model.findById({_id:semesterId}).populate('created_by');
    if(!semester){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"Semester not found *")
    }
    return semester;
}


export const Semester_Services = {
    Create_Semester_Service,
    Semester_Update_Service,
    Semester_Delete_Service,
    Get_All_Semester_Service,
    Get_One_Semester_Service
}