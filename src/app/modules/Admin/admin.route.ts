

import express from 'express';
import Token_Verify from '../../middlewares/token.validation';
import { Admin_Controller } from './admin.controller';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_UPDATE_Admin_Type } from './zod.admin.type';


const router = express.Router();

// get all admin route
router.get('/:uid',Token_Verify("SUPER"),Admin_Controller.Get_All_Admin_Controller);

// get one faculty route
router.get('/one/:a_email',Token_Verify("ADMIN","SUPER"),Admin_Controller.Get_One_Admin_Controller);

// update admin route
router.patch('/:a_email',Token_Verify("ADMIN","SUPER"),Zod_Validation_Request(Zod_UPDATE_Admin_Type),Admin_Controller.Udpate_Admin_Controller)


export const Admin_Routes = router;
