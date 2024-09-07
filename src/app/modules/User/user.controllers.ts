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

// create faculty controller
const Create_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await User_Services.Create_Admin_Service(req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create A Admin !",
        data: result
    })
})

// get all users controller
const Get_All_User_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await User_Services.Get_All_User_Service(req.user,req.params.uid,req.query);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get all users !",
        data: result
    })
})

// get one user controller
const Get_One_User_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await User_Services.Get_One_User_Service(req.user,req.params.uid);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get one user !",
        data: result
    })
})


export const User_Controllers = {
    Create_Student_Controller,
    Create_Faculty_Controller,
    Create_Admin_Controller,
    Get_All_User_Controller,
    Get_One_User_Controller
}