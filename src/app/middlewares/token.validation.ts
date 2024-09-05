import { NextFunction, Request, Response } from "express"
import Final_App_Error from "../class/Final.app.error";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import Async_Catch from "../utils/try.code";
import { User_Status_Type } from "../global/constants";
import { User_Model } from "../modules/User/user.model";

export type User_Role_Types = "STUDENT" | "FACULTY" | "ADMIN" | "SUPER";


const Token_Verify = (...roles: User_Role_Types[]) => {
    return Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // if there is no token
        if (!token) {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "Forbidden User");
        }
        // set token data to req.user
        let decodedData = null;
        try {
            decodedData = jwt.verify(token, (config.jwt_secret as string)) as JwtPayload;
            if (!decodedData) {
                throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access found*");
            }
        } catch (err) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access found ++*");
        }
        const user = await User_Model.findOne({ email: decodedData!.email });
        // if user not found by token email
        if (!user) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
        }
        // if user is blocked
        if (user.status === User_Status_Type.BLOCK) {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
        }
        // if user is expired
        if (user.status === User_Status_Type.EXPIRED) {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is expired *");
        }
        // if the user role is not matched with required role types
        if (roles && !roles.includes(user.role)) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not authorized *")
        }

        // check first, is password updated or not, if updated then check the time 
        if (user?.passwordChangedAt && User_Model.isTokenValid(Number(decodedData!.iat), user?.passwordChangedAt)) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access *");
        }
        req.user = decodedData!;
        next();
    })
}

export default Token_Verify;