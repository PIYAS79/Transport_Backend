import express from 'express';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Login_Type } from './auth.zod.type';
import { Auth_Controller } from './auth.controller';

const router = express.Router();


// login user route
router.post('/login', Zod_Validation_Request(Zod_Login_Type), Auth_Controller.Auth_Login_Controller)



export const Auth_Routes = router;