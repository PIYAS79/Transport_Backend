import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { User_Services } from "./user.services";


// create student controller 
const Create_Student_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await User_Services.Create_Student_Service(req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create A Student !",
        data: result
    })
})

// create faculty controller
const Create_Faculty_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await User_Services.Create_Faculty_Service(req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create A Faculty !",
        data: result
    })
})



export const User_Controllers = {
    Create_Student_Controller,
    Create_Faculty_Controller
}