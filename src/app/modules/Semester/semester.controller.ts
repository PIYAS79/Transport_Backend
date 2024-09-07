import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Semester_Services } from "./semester.services";
import httpStatus from "http-status";



// create semester controller 
const Create_Semester_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Semester_Services.Create_Semester_Service(req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create A Semester !",
        data: result
    })
})

// update semester controller 
const Semester_Update_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const semesterId = req.params.sid;
    const tokenData = req.user;
    const result = await Semester_Services.Semester_Update_Service(req.body,semesterId,tokenData);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Update Semester !",
        data: result
    })
})

// delete semester controller 
const Semester_Delete_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const semesterId = req.params.sid;
    const tokenData = req.user;
    const result = await Semester_Services.Semester_Delete_Service(semesterId,tokenData);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Delete Semester !",
        data: result
    })
})

// get all semester controller
const Get_All_Semester_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Semester_Services.Get_All_Semester_Service(req.query);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Get all semester !",
        data: result
    })
})

// get one semester controller
const Get_One_Semester_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Semester_Services.Get_One_Semester_Service(req.params.sem_id);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Get one semester !",
        data: result
    })
})



export const Semester_Controller = {
    Create_Semester_Controller,
    Semester_Update_Controller,
    Semester_Delete_Controller,
    Get_All_Semester_Controller,
    Get_One_Semester_Controller
}