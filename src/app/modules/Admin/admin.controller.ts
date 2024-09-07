import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Admin_Services } from "./admin.services";
import httpStatus from "http-status";





// get all admin controller 
const Get_All_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Admin_Services.Get_All_Admin_Service(req.params.uid,req.user,req.query);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get all admin !",
        data: result
    })
})


// get all admin controller 
const Get_One_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Admin_Services.Get_One_Admin_Service(req.params.a_email,req.user);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get one admin !",
        data: result
    })
})

// update admin data controller
const Udpate_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Admin_Services.Udpate_Admin_Service(req.body,req.user,req.params.a_email);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully update one faculty !",
        data: result
    })
})





export const Admin_Controller = {
    Get_All_Admin_Controller,
    Get_One_Admin_Controller,
    Udpate_Admin_Controller
}