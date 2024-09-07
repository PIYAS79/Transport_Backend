import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Faculty_Services } from "./faculty.services";







// get all faculty controller 
const Get_All_Faculty_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Faculty_Services.Get_All_Faculty_Service(req.params.uid,req.user,req.query);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get all faculty !",
        data: result
    })
})


// get all faculty controller 
const Get_One_Faculty_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Faculty_Services.Get_One_Faculty_Service(req.params.f_email,req.user);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get one faculty !",
        data: result
    })
})

// update faculty data controller
const Udpate_Faculty_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Faculty_Services.Udpate_Faculty_Service(req.body,req.user,req.params.f_email);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully update one faculty !",
        data: result
    })
})



export const Faculty_Controller = {
    Get_All_Faculty_Controller,
    Get_One_Faculty_Controller,
    Udpate_Faculty_Controller
}