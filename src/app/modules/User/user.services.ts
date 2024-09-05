import mongoose from "mongoose"
import config from "../../config"
import { User_Type } from "./user.interface"
import { User_Model } from "./user.model";
import { Get_Student_Type, Student_Type } from "../Student/student.interface";
import Final_App_Error from "../../class/Final.app.error";
import httpStatus from "http-status";
import { Student_Model } from "../Student/student.model";
import { Faculty_Type, Get_Faculty_Type } from "../Faculty/faculty.interface";
import { Faculty_Model } from "../Faculty/faculty.model";
import { Admin_Type, Get_Admin_Type } from "../Admin/admin.interface";
import { Admin_Model } from "../Admin/admin.model";



// create student service
const Create_Student_Service = async (data: Get_Student_Type) => {

    const session = await mongoose.startSession();
    try {

        session.startTransaction();

        // first create a user
        const newUser: User_Type = {
            email: data.email,
            isPasswordChanged: false,
            password: config.dummy_pass as string,
            role: "STUDENT",
            status: "ACTIVE"
        }
        const currentCreatedUser = await User_Model.create([newUser], { session });

        // is the user is not created 
        if (!currentCreatedUser.length) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "There is an server side error -  during USER creation");
        }

        // if user created successfully then create the student
        const New_Student: Student_Type = {
            department: data.department,
            email: data.email,
            name: data.name,
            studentId: data.studentId,
            user: currentCreatedUser[0]._id
        }

        const currentCreatedStudent = await Student_Model.create([New_Student], { session });
        if (!currentCreatedStudent.length) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "There is an server side error -  during STUDENT creation");
        }



        await session.commitTransaction();
        await session.endSession();
        return currentCreatedStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }







}

// create faculty service
const Create_Faculty_Service = async (data: Get_Faculty_Type) => {

    const session = await mongoose.startSession();
    try {

        session.startTransaction();

        // first create a user
        const newUser: User_Type = {
            email: data.email,
            isPasswordChanged: false,
            password: config.dummy_pass as string,
            role: "FACULTY",
            status: "ACTIVE",
        }
        const currentCreatedUser = await User_Model.create([newUser], { session });

        // is the user is not created 
        if (!currentCreatedUser.length) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "There is an server side error -  during USER creation");
        }

        // if user created successfully then create the faculty
        const New_Faculty: Faculty_Type = {
            department: data.department,
            email: data.email,
            name: data.name,
            facultyId: data.facultyId,
            user: currentCreatedUser[0]._id
        }

        const currentCreatedFaculty = await Faculty_Model.create([New_Faculty], { session });
        if (!currentCreatedFaculty.length) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "There is an server side error -  during Faculty creation");
        }


        await session.commitTransaction();
        await session.endSession();
        return currentCreatedFaculty;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }

}

// create admin service
const Create_Admin_Service = async (data: Get_Admin_Type) => {

    const session = await mongoose.startSession();
    try {

        session.startTransaction();

        // first create a user
        const newUser: User_Type = {
            email: data.email,
            isPasswordChanged: false,
            password: config.dummy_pass as string,
            role: "ADMIN",
            status: "ACTIVE",
        }
        const currentCreatedUser = await User_Model.create([newUser], { session });

        // is the user is not created 
        if (!currentCreatedUser.length) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "There is an server side error -  during USER creation");
        }

        // if user created successfully then create the admin
        const New_Admin: Admin_Type = {
            email: data.email,
            name: data.name,
            adminId: data.adminId,
            user: currentCreatedUser[0]._id
        }

        const currentCreatedAdmin = await Admin_Model.create([New_Admin], { session });
        if (!currentCreatedAdmin.length) {
            throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "There is an server side error -  during Admin creation");
        }


        await session.commitTransaction();
        await session.endSession();
        return currentCreatedAdmin;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }

}


export const User_Services = {
    Create_Student_Service,
    Create_Faculty_Service,
    Create_Admin_Service
}