import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Semester_Card_Stack_Services } from "./semesterCardStack.services";




// create card request controller 
const Card_Request_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Semester_Card_Stack_Services.Card_Request_Service(req.body,req.user);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Request Created For Semester Package !",
        data: result
    })
})

// create card request controller 
const Request_Withdraw_By_User_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Semester_Card_Stack_Services.Request_Withdraw_By_User_Service(req.body,req.user);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Withdraw Request !",
        data: result
    })
})

// create card request controller 
const Withdraw_Confirm_By_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Semester_Card_Stack_Services.Withdraw_Confirm_By_Admin_Service(req.user);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Request Withdraw Confirmed By Admin !",
        data: result
    })
})

// card request approve by admin controller 
const Card_Request_Approved_By_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Semester_Card_Stack_Services.Card_Request_Approved_By_Admin_Service(req.params.rid,req.user);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Card Request Confirmed By Admin !",
        data: result
    })
})
// card request approve by admin controller 
const Get_All_Card_Req_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Semester_Card_Stack_Services.Get_All_Card_Req_Service(req.query);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get all card requsests !",
        data: result
    })
})
// card request approve by admin controller 
const Get_One_Card_Req_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const result = await Semester_Card_Stack_Services.Get_One_Card_Req_Service(req.params.rid);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully get one card requsest !",
        data: result
    })
})




export const Semester_Card_Stack_Controller = {
    Card_Request_Controller,
    Request_Withdraw_By_User_Controller,
    Withdraw_Confirm_By_Admin_Controller,
    Card_Request_Approved_By_Admin_Controller,
    Get_All_Card_Req_Controller,
    Get_One_Card_Req_Controller
}