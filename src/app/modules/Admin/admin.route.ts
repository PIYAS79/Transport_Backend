

import express from 'express';
import Token_Verify from '../../middlewares/token.validation';
import { Admin_Controller } from './admin.controller';


const router = express.Router();

// get all admin route
router.get('/:uid',Token_Verify("SUPER"),Admin_Controller.Get_All_Admin_Controller);

// get one faculty route
router.get('/one/:a_email',Token_Verify("ADMIN","SUPER"),Admin_Controller.Get_One_Admin_Controller);



export const Admin_Routes = router;
