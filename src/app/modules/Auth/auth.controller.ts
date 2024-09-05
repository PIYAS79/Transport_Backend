import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import httpStatus from "http-status";
import { Auth_Services } from "./auth.services";



const Auth_Login_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Auth_Services.Auth_Login_Service(req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Login User !",
        data: result
    })
})


export const Auth_Controller = {
    Auth_Login_Controller,
}





