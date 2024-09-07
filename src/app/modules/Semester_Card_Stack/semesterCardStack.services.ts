import { Jwt, JwtPayload } from "jsonwebtoken"
import { GET_SemesterCardStack_Type, SemesterCardStack_Type } from "./semesterCardStack.interface"
import { User_Model } from "../User/user.model"
import Final_App_Error from "../../class/Final.app.error";
import httpStatus from "http-status";
import { Semester_Model } from "../Semester/semester.model";
import { SemesterCardStack_Model } from "./semesterCardStack.model";
import { Card_Type } from "../Card/card.interface";
import { Card_Model } from "../Card/card.model";
import { calculateExpireTime_For_A_Semester } from "./Semester_Card_Stack.utils";
import Query_Builder from "../../class/Query.builder";




const Card_Request_Service = async (data: GET_SemesterCardStack_Type, tokenData: JwtPayload) => {

    // find the user
    const user = await User_Model.findById({ _id: data.user });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // is user email and token email and data email is matched or not 
    if (data.email !== user.email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Provided Email and User Email is not matched *");
    }
    if (tokenData.email !== user.email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Token Email and User Email is not matched *");
    }
    // find semester
    const semester = await Semester_Model.findById({ _id: data.semester_id });
    if (!semester) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Semester not found *");
    }
    // is semester deleted or not 
    if (semester.isDeleted) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "Semester is deleted by the authority");
    }
    // if all ok then create a request 
    const result = await SemesterCardStack_Model.create(data);
    return result;
}
// request withdraw by user 
const Request_Withdraw_By_User_Service = async (data: { status: boolean }, tokenData: JwtPayload) => {

    // find the user first
    const user = await User_Model.findOne({ email: tokenData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    // find the requested doc
    const requestedDoc = await SemesterCardStack_Model.findOne({ email: tokenData.email });
    if (!requestedDoc) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Requested Card Document is not found *");
    }
    // check is already withdraw or not
    if (requestedDoc.status === "WITHDRAW") {
        throw new Final_App_Error(httpStatus.CONFLICT, "You already withdraw this request")
    }
    // if all ok 
    const result = await SemesterCardStack_Model.findByIdAndUpdate({ _id: requestedDoc._id }, {
        status: "WITHDRAW"
    }, { new: true })


    return result;
}
// request withdraw confirm by admin 
const Withdraw_Confirm_By_Admin_Service = async (tokenData: JwtPayload) => {

    // find the user first
    const user = await User_Model.findOne({ email: tokenData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    // find the requested doc
    const requestedDoc = await SemesterCardStack_Model.findOne({ email: tokenData.email });
    if (!requestedDoc) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Requested Card Document is not found *");
    }
    // check is already withdraw or not
    if (requestedDoc.status === "PENDING") {
        throw new Final_App_Error(httpStatus.CONFLICT, "You cant confirm because the user didnt withdraw this request ")
    }
    // if all ok 
    const result = await SemesterCardStack_Model.findByIdAndDelete({ _id: requestedDoc._id }, { new: true });
    return result
}
// card request approve by admin service
const Card_Request_Approved_By_Admin_Service = async (requestId: string, tokenData: JwtPayload) => {

    // find the user
    const user = await User_Model.findOne({ email: tokenData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // is user email and token email is matched or not 
    if (tokenData.email !== user.email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Token Email and User Email is not matched *");
    }
    // find requested doc
    const request = await SemesterCardStack_Model.findById({ _id: requestId });
    if (!request) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Card Request not found *");
    }
    // check the request status is WITHDRAW or not
    if (request?.status === "WITHDRAW") {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User withdraw this requrest *")
    }
    // find semester
    const semester = await Semester_Model.findById({ _id: request?.semester_id });
    if (!semester) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Semester not found *");
    }
    // is semester deleted or not 
    if (semester.isDeleted) {
        throw new Final_App_Error(httpStatus.BAD_REQUEST, "Semester is deleted by the authority");
    }

    // Calculate the duration in months
    const duration = semester.endMonth - semester.startMonth;

    // Calculate the expiredAt date as a formatted string
    const expiredAt = calculateExpireTime_For_A_Semester(duration);

    const newCard: Card_Type = {
        user: request.user,
        cardType: "Semester Pass Out",
        email: user.email,
        semesterId: semester._id,
        route: request.route,
        amount: request.payment_amount,
        transaction_id: request.transaction_id,
        payedWith: request.payedWith,
        duraton: `${duration} Months`,
        expiredAt: expiredAt,
        confirmedBy: user._id,
        status: "ACTIVE"
    }

    // if all ok then create a request 
    const result = await Card_Model.create(newCard);

    // now can delete the request from stack
    await SemesterCardStack_Model.findByIdAndDelete({ _id: requestId });

    return result;
}
// get all card request service
const Get_All_Card_Req_Service = async (query: Record<string, unknown>) => {


    const partialTags = ['payment_amount', 'route', 'email', 'semester_id', 'payedWith', 'status'];
    const semesterCradReqStack = new Query_Builder(SemesterCardStack_Model.find().populate("semester_id").populate("user"), query)
        .searchQuery(partialTags)
        .fieldQuery()
        .filterQuery()
        .sortQuery()
        .pageQuery()

    const result = await semesterCradReqStack.modelQuery;
    const meta = await semesterCradReqStack.countTotalMeta();
    return { result, meta }
}
// get one card request service
const Get_One_Card_Req_Service = async (rid: string) => {
    const result = await SemesterCardStack_Model.findById({_id:rid}).populate('semester_id').populate('user');
    return result;
}


export const Semester_Card_Stack_Services = {
    Card_Request_Service,
    Request_Withdraw_By_User_Service,
    Withdraw_Confirm_By_Admin_Service,
    Card_Request_Approved_By_Admin_Service,
    Get_All_Card_Req_Service,
    Get_One_Card_Req_Service
}