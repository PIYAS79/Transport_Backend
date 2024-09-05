import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Change_Password_Type, Zod_Forget_Password_Type, Zod_Login_Type, Zod_Refresh_Token_Type, Zod_Reset_Password_Type } from './auth.zod.type';
import { Auth_Controller } from './auth.controller';
import Token_Verify from '../../middlewares/token.validation';

const router = express.Router();


// login user route
router.post('/login', Zod_Validation_Request(Zod_Login_Type), Auth_Controller.Auth_Login_Controller)
// change password
router.patch('/change',Token_Verify("ADMIN","FACULTY","STUDENT","SUPER"),Zod_Validation_Request(Zod_Change_Password_Type),Auth_Controller.ChangePass_Controller)
// forget password route
router.patch('/forget',Zod_Validation_Request(Zod_Forget_Password_Type),Auth_Controller.Forget_Pass_Controller)
// reset password route
router.patch('/reset',Token_Verify("ADMIN","FACULTY","STUDENT","SUPER"),Zod_Validation_Request(Zod_Reset_Password_Type),Auth_Controller.Reset_Pass_Controller)
// get access token by refresh token 
router.get('/refresh',Zod_Validation_Request(Zod_Refresh_Token_Type),Auth_Controller.Get_Acc_Token_By_Refresh_Token_Controller)

export const Auth_Routes = router;