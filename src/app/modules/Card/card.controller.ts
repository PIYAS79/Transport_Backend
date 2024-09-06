import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Card_Services } from "./card.services";



// create one pass card controller
const Create_One_Way_Pass_Card = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Card_Services.Create_One_Way_Pass_Card_Service(req.body,req.user);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Generated One Way Auto Pass Card !",
        data: result
    })
})

// get a user all cards
const Get_A_User_All_Cards = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Card_Services.Get_A_User_All_Cards(req.user,req.params.uid);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get a user all cards !",
        data: result
    })
})



export const Card_Controller = {
    Create_One_Way_Pass_Card,
    Get_A_User_All_Cards
}