


import express from 'express';
import { User_Controllers } from './user.controllers';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Student_Type } from '../Student/zod.student.type';
import { Zod_Faculty_Type } from '../Faculty/zod.faculty.type';
import { Zod_Admin_Type } from '../Admin/zod.admin.type';
import Token_Verify from '../../middlewares/token.validation';


const router = express.Router();

// create student route
router.post('/student', Zod_Validation_Request(Zod_Student_Type), User_Controllers.Create_Student_Controller)
// create faculty route
router.post('/faculty', Zod_Validation_Request(Zod_Faculty_Type), User_Controllers.Create_Faculty_Controller)
// create admin route
router.post('/admin', Zod_Validation_Request(Zod_Admin_Type), User_Controllers.Create_Admin_Controller)





export const User_Routes = router;