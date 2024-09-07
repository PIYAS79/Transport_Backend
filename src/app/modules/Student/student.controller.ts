import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Student_Services } from "./student.services";




// get all student controller 
const Get_All_Student_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Student_Services.Get_All_Student_Service(req.params.uid,req.user,req.query);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get all students !",
        data: result
    })
})


// get all student controller 
const Get_One_Student_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Student_Services.Get_One_Student_Service(req.params.s_email,req.user);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get one student !",
        data: result
    })
})

export const Student_Controller = {
    Get_All_Student_Controller,
    Get_One_Student_Controller
}