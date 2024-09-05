import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { User_Services } from "./user.services";



const Create_User_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {


    const result = await User_Services.Create_User_Service(req.body);


    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create User !",
        data: result
    })
})



export const User_Controllers = {
    Create_User_Controller,
}