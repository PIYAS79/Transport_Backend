import { JwtPayload } from "jsonwebtoken";
import { User_Model } from "../User/user.model";
import Final_App_Error from "../../class/Final.app.error";
import httpStatus from "http-status";
import { Admin_Model } from "./admin.model";
import Query_Builder from "../../class/Query.builder";


// get all admin services 
const Get_All_Admin_Service = async (userId: string, tokenData: JwtPayload, query: Record<string, unknown>) => {

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
    if (user.role === "SUPER") {

        const partialTags = ['name.f_name', 'name.m_name', 'name.l_name', 'email', 'adminId'];
        const userQueryInstance = new Query_Builder(Admin_Model.find().populate("user"), query)
            .searchQuery(partialTags)
            .fieldQuery()
            .filterQuery()
            .sortQuery()
            .pageQuery()

        const result = await userQueryInstance.modelQuery;
        const meta = await userQueryInstance.countTotalMeta();

        return { result, meta };

    } else {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not an super admin *");
    }
}

// get one admin service 
const Get_One_Admin_Service = async (a_email: string, tokenData: JwtPayload) => {

    const admin = await Admin_Model.findOne({email:a_email}).populate('user');
    if(!admin){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"Admin is not found *");
    }
    if(tokenData.role==="SUPER"){
        // find the user throw token email for ensuring that this is an admin
        const user = await User_Model.findOne({email:tokenData.email});
        if(!user){
            throw new Final_App_Error(httpStatus.NOT_FOUND,"User not found *");
        }
        // check the role again 
        if(user.role!== tokenData.role){
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Token role is not matched *")
        }
        return admin;
    }else{
        if(tokenData.role === "ADMIN"){
            // check the email with the token
            if(tokenData.email !== admin.email){
                throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Token is not matched with the data *")
            }
            // find the user 
            const userByAdmin = await User_Model.findOne({email:a_email});
            if(!userByAdmin){
                throw new Final_App_Error(httpStatus.NOT_FOUND,"User is not found *");
            }
            // check the user status
            if(userByAdmin.status ==="BLOCK"){
                throw new Final_App_Error(httpStatus.FORBIDDEN,"Your account is blocked by the authority *")
            }
            if(userByAdmin.status ==="EXPIRED"){
                throw new Final_App_Error(httpStatus.FORBIDDEN,"Your account is expired by the authority *")
            }
            return admin;
        }else{
            // you are an faculty or token is not valid 
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Your token is not matched with the data *")
        }
    }
}



export const Admin_Services = {
    Get_All_Admin_Service,
    Get_One_Admin_Service
}