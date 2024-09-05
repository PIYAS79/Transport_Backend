import httpStatus from "http-status";
import Final_App_Error from "../../class/Final.app.error";
import { User_Model } from "../User/user.model";
import { Get_Change_Password_Type, Get_Login_Type, Get_Reset_Password_Type } from "./auth.interface";
import { decodeDataByBcrypt, encodeDatabyBcrypt } from "../../utils/bcrypt";
import { Create_JWT_Token } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { SendEmail } from "../../utils/nodeMailer";
import { User_Type } from "../User/user.interface";
import jwt from 'jsonwebtoken';


// auth login service
const Auth_Login_Service = async (data: Get_Login_Type) => {

    const isUserExistByEmail = await User_Model.isUserExist(data.email);
    if (!isUserExistByEmail) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found into the DB *");
    }

    // if the user is blocked or not !
    if (isUserExistByEmail.status === 'BLOCK') {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is Blocked *");
    }
    // if the user is expired or not !
    if (isUserExistByEmail.status === 'EXPIRED') {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is Expired *");
    }

    // check is the password is match or not !
    const isPasswordMatch = await decodeDataByBcrypt(isUserExistByEmail.password, data.password);
    if (!isPasswordMatch) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Password did not match *");
    }


    const Refresh_Token = Create_JWT_Token({
        data: {
            email: isUserExistByEmail.email,
            role: isUserExistByEmail.role
        },
        secret: config.jwt_secret as string,
        exp: config.refresh_token_exp as string
    })
    const Access_Token = Create_JWT_Token({
        data: {
            email: isUserExistByEmail.email,
            role: isUserExistByEmail.role
        },
        secret: config.jwt_secret as string,
        exp: config.access_token_exp as string
    })

    return { Refresh_Token, Access_Token, me: isUserExistByEmail }
}

// change password service 
const Change_Pass_Service = async (data: Get_Change_Password_Type, user: JwtPayload) => {

    const tokenUser = await User_Model.isUserExist(user.email);
    if (!tokenUser) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found *");
    }
    // check the user password
    if (! await decodeDataByBcrypt(tokenUser.password, data.old_password)) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access Found *");
    }
    // is all ok 
    const newHashedPass = await encodeDatabyBcrypt(data.new_password);
    const result = await User_Model.findOneAndUpdate(
        { email: user.email },
        {
            password: newHashedPass,
            passwordChangeAt: new Date(),
        },
        { new: true }
    );

    return result;
}

// forget password service 
const Forget_Pass_Service = async (email: { email: string }) => {
    // check is the user is exist or not 
    const isUserExist = await User_Model.isUserExist(email.email) as User_Type;
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found *");
    }
    // check is the user is blocked or not 
    if (isUserExist.status === 'BLOCK') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
    }
    // check is the user is expired or not 
    if (isUserExist.status === 'EXPIRED') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
    }
    // if all ok then send the forget link to the email
    try {
        // check a short period token for reset password 
        const resetToken = Create_JWT_Token({
            data: {
                email: isUserExist.email,
                role: isUserExist.role
            },
            secret: config.jwt_secret as string,
            exp: '5m'
        })

        const html = `<h1>Test HTML</h1><br/><p>click here : ${config.frontend_url}/auth/forget?token=${resetToken}</p>`;
        const subject = "Forget Password";
        // send email 
        SendEmail(isUserExist.email, html, subject);
    } catch (err) {
        throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error - Nodemailer");
    }

    return "Check Your Email For Reset Password !"
}

// reset password service 
const Reset_Password_Service = async (data: Get_Reset_Password_Type, user: JwtPayload) => {
    console.log({ data, user })

    const FoundUser = await User_Model.isUserExist(user.email) as User_Type;
    // check is the user is found or not
    if (!FoundUser) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // check is the user is blocked or not 
    if (FoundUser.status === 'BLOCK') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
    }
    // check is the user is expired or not 
    if (FoundUser.status === 'EXPIRED') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
    }
    // check both email are same or not 
    if (user.email !== FoundUser.email) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Token-Email is not valid *")
    }
    // hash password 
    const hashedPass = await encodeDatabyBcrypt(data.new_password)
    // is all ok then update user data
    const result = await User_Model.findOneAndUpdate({ email: user.email }, {
        password: hashedPass,
        passwordChangeAt: new Date()
    }, { new: true })

    return result;
}

// get access token by refresh token service
const Get_Acc_Token_By_Refresh_Token_Service = async (refToken: string) => {

    const decodeTokenData = jwt.decode(refToken) as JwtPayload;

    // check if the user is exist or not 
    const user = await User_Model.isUserExist(decodeTokenData.email);
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // check is the user is blocked or not
    if (user.status === 'BLOCK') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
    }
    // check is the user is expired or not
    if (user.status === 'EXPIRED') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is expired *");
    }
    // check if the refresh token is valid or not 
    if (user.passwordChangedAt && User_Model.isTokenValid(decodeTokenData.iat as number, user.passwordChangedAt)) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not authorized *");
    }

    const accessToken = Create_JWT_Token({
        data: {
            email: user.email,
            role: user.role
        },
        secret: config.jwt_secret as string,
        exp: config.access_token_exp as string
    })

    return accessToken;
}

export const Auth_Services = {
    Auth_Login_Service,
    Change_Pass_Service,
    Forget_Pass_Service,
    Reset_Password_Service,
    Get_Acc_Token_By_Refresh_Token_Service
}