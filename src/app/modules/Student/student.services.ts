import { JwtPayload } from "jsonwebtoken"
import Final_App_Error from "../../class/Final.app.error";
import { User_Model } from "../User/user.model";
import httpStatus from "http-status";
import { Student_Model } from "./student.model";
import Query_Builder from "../../class/Query.builder";




// get all student services 
const Get_All_Student_Service = async (userId: string, tokenData: JwtPayload, query: Record<string, unknown>) => {

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

        const partialTags = ['name.f_name', 'name.m_name', 'name.l_name', 'email', 'studentId', 'department'];
        const userQueryInstance = new Query_Builder(Student_Model.find().populate("user"), query)
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

// get one student service 
const Get_One_Student_Service = async (s_email: string, tokenData: JwtPayload) => {

    const student = await Student_Model.findOne({email:s_email}).populate('user');
    if(!student){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"Student is not found *");
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
        return student;
    }else{
        if(tokenData.role === "STUDENT"){
            // check the email with the token
            if(tokenData.email !== student.email){
                throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Token is not matched with the data *")
            }
            // find the user 
            const userByStudent = await User_Model.findOne({email:s_email});
            if(!userByStudent){
                throw new Final_App_Error(httpStatus.NOT_FOUND,"User is not found *");
            }
            // check the user status
            if(userByStudent.status ==="BLOCK"){
                throw new Final_App_Error(httpStatus.FORBIDDEN,"Your account is blocked by the authority *")
            }
            if(userByStudent.status ==="EXPIRED"){
                throw new Final_App_Error(httpStatus.FORBIDDEN,"Your account is expired by the authority *")
            }
            console.log(userByStudent)
            return student;
        }else{
            // you are an faculty or token is not valid 
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Your token is not matched with the data *")
        }
    }
}



export const Student_Services = {
    Get_All_Student_Service,
    Get_One_Student_Service
}