import { JwtPayload } from "jsonwebtoken";
import { Card_Type, Get_One_Pass_Card_Type } from "./card.interface"
import { User_Model } from "../User/user.model";
import Final_App_Error from "../../class/Final.app.error";
import httpStatus from "http-status";
import { Card_Model } from "./card.model";
import { calculateExpireTime_For_One_Way } from "./card.utils";
import Query_Builder from "../../class/Query.builder";




const Create_One_Way_Pass_Card_Service = async (data: Get_One_Pass_Card_Type, tokenData: JwtPayload) => {

    // find the user
    const user = await User_Model.findById({ _id: data.user });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    // check the email with user.email with token 
    if (user.email !== tokenData.email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Your user data is not matched with your token *");
    }
    // check the data email and user email is matched or not
    if(user.email !== data.email){
        throw new Final_App_Error(httpStatus.UNAUTHORIZED,"User email and sended data email is not matched *")
    }
    // if all ok then generate a auto pass card 
    const newCard: Card_Type = {
        user: user._id,
        cardType: data.cardType,
        email: user.email,
        status: "ACTIVE",
        route: data.route,
        amount: data.amount,
        transaction_id: data.transaction_id,
        payedWith: data.payedWith,
        expiredAt: calculateExpireTime_For_One_Way(2),
        duraton: '2 Hours',
        confirmedBy: "AUTO",
    }

    const result = await Card_Model.create(newCard);

    return result;
}

// get a user all cards
const Get_A_User_All_Cards = async(tokendata:JwtPayload,userId:string)=>{

    // find the user 
    const user = await User_Model.findById({_id:userId});
    if(!user){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User is not found *");
    }
    // check the user email and token email is matched or not !
    if(user.email !== tokendata.email){
        throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Token is not matched with the data !");
    }
    // if all ok then send the data 
    const result = await Card_Model.find({email:tokendata.email});


    return result;
}

// get all card service 
const Get_All_Cards_Service = async(tokenData: JwtPayload, userId: string, query: Record<string, unknown>)=>{
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
        const partialTags = ['cardType','email','status','duraton','route','amount','payedWith','confirmedBy'];
        const cardInstance = new Query_Builder(Card_Model.find().populate('confirmedBy').populate('semesterId').populate('user'), query)
            .searchQuery(partialTags)
            .fieldQuery()
            .filterQuery()
            .sortQuery()
            .pageQuery()

        const result = await cardInstance.modelQuery;
        const meta = await cardInstance.countTotalMeta();
        return { result, meta }
    } else {

        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not an admin *");
    }
}


export const Card_Services = {
    Create_One_Way_Pass_Card_Service,
    Get_A_User_All_Cards,
    Get_All_Cards_Service
}