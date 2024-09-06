import { JwtPayload } from "jsonwebtoken";
import { Card_Type, Get_One_Pass_Card_Type } from "./card.interface"
import { User_Model } from "../User/user.model";
import Final_App_Error from "../../class/Final.app.error";
import httpStatus from "http-status";
import { Card_Model } from "./card.model";
import { calculateExpireTime_For_One_Way } from "./card.utils";




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


export const Card_Services = {
    Create_One_Way_Pass_Card_Service,
    Get_A_User_All_Cards
}