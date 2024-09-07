import { JwtPayload } from "jsonwebtoken";
import { User_Model } from "../User/user.model";
import Final_App_Error from "../../class/Final.app.error";
import httpStatus from "http-status";
import Query_Builder from "../../class/Query.builder";
import { Faculty_Model } from "./faculty.model";
import { Update_Faculty_Type } from "./faculty.interface";



// get all faculty services 
const Get_All_Faculty_Service = async (userId: string, tokenData: JwtPayload, query: Record<string, unknown>) => {

    // find the user by userId
    const user = await User_Model.findById({ _id: userId });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User is not found *");
    }
    // check the user email and token email is matched or not 
    if (user.email !== tokenData.email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Your token data is not valid with your profile *")
    }
    // check the role 
    if (user.role === "ADMIN" || user.role === "SUPER") {

        const partialTags = ['name.f_name', 'name.m_name', 'name.l_name', 'email', 'facultyId', 'department'];
        const userQueryInstance = new Query_Builder(Faculty_Model.find().populate("user"), query)
            .searchQuery(partialTags)
            .fieldQuery()
            .filterQuery()
            .sortQuery()
            .pageQuery()

        const result = await userQueryInstance.modelQuery;
        const meta = await userQueryInstance.countTotalMeta();

        return { result, meta };

    } else {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not an admin *");
    }
}

// get one faculty service 
const Get_One_Faculty_Service = async (f_email: string, tokenData: JwtPayload) => {

    const faculty = await Faculty_Model.findOne({email:f_email}).populate('user');
    if(!faculty){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"Faculty is not found *");
    }
    if(tokenData.role==="ADMIN"||tokenData.role==="SUPER"){
        // find the user throw token email for ensuring that this is an admin
        const user = await User_Model.findOne({email:tokenData.email});
        if(!user){
            throw new Final_App_Error(httpStatus.NOT_FOUND,"User not found *");
        }
        // check the role again 
        if(user.role!== tokenData.role){
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Token role is not matched *")
        }
        return faculty;
    }else{
        if(tokenData.role === "FACULTY"){
            // check the email with the token
            if(tokenData.email !== faculty.email){
                throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Token is not matched with the data *")
            }
            // find the user 
            const userByFaculty = await User_Model.findOne({email:f_email});
            if(!userByFaculty){
                throw new Final_App_Error(httpStatus.NOT_FOUND,"User is not found *");
            }
            // check the user status
            if(userByFaculty.status ==="BLOCK"){
                throw new Final_App_Error(httpStatus.FORBIDDEN,"Your account is blocked by the authority *")
            }
            if(userByFaculty.status ==="EXPIRED"){
                throw new Final_App_Error(httpStatus.FORBIDDEN,"Your account is expired by the authority *")
            }
            return faculty;
        }else{
            // you are an faculty or token is not valid 
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Your token is not matched with the data *")
        }
    }
}

// update faculty service 
const Udpate_Faculty_Service = async (data: Update_Faculty_Type, tokenData: JwtPayload, f_email: string) => {

    const faculty = await Faculty_Model.findOne({ email: f_email })
    if (!faculty) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Faculty is not found *");
    }
    if (tokenData.role === "ADMIN" || tokenData.role === "SUPER") {
        // find the user throw token email for ensuring that this is an admin
        const user = await User_Model.findOne({ email: tokenData.email });
        if (!user) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
        }
        // check the role again 
        if (user.role !== tokenData.role) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Token role is not matched *")
        }

        // if all ok then update the student
        const result = await Faculty_Model.findByIdAndUpdate({ _id: faculty._id }, {
            name: {
                f_name: data.name?.f_name ? data.name.f_name : faculty.name.f_name,
                m_name: data.name?.m_name ? data.name.m_name : faculty.name.m_name,
                l_name: data.name?.l_name ? data.name.l_name : faculty.name.l_name,
            },
            facultyId: data.facultyId ? data.facultyId : faculty.facultyId,
            department: data.department ? data.department : faculty.department
        }, { new: true });
        return result;
    } else {
        if (tokenData.role === "FACULTY") {
            // check the email with the token
            if (tokenData.email !== faculty.email) {
                throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Token is not matched with the data *")
            }
            // find the user 
            const userByFaculty = await User_Model.findOne({ email: f_email });
            if (!userByFaculty) {
                throw new Final_App_Error(httpStatus.NOT_FOUND, "User is not found *");
            }
            // check the user status
            if (userByFaculty.status === "BLOCK") {
                throw new Final_App_Error(httpStatus.FORBIDDEN, "Your account is blocked by the authority *")
            }
            if (userByFaculty.status === "EXPIRED") {
                throw new Final_App_Error(httpStatus.FORBIDDEN, "Your account is expired by the authority *")
            }
            // if all ok then update the data 
            const result = await Faculty_Model.findByIdAndUpdate({ _id: faculty._id }, {
                name: {
                    f_name: data.name?.f_name ? data.name.f_name : faculty.name.f_name,
                    m_name: data.name?.m_name ? data.name.m_name : faculty.name.m_name,
                    l_name: data.name?.l_name ? data.name.l_name : faculty.name.l_name,
                },
                facultyId: data.facultyId ? data.facultyId : faculty.facultyId,
                department: data.department ? data.department : faculty.department
            }, { new: true });
            return result;
        } else {
            // you are an faculty or token is not valid 
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Your token is not matched with the data *")
        }
    }
}


export const Faculty_Services = {
    Get_All_Faculty_Service,
    Get_One_Faculty_Service,
    Udpate_Faculty_Service
}