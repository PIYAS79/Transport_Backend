import express from 'express';
import Token_Verify from '../../middlewares/token.validation';
import { Student_Controller } from './student.controller';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_UPDATE_Student_Type } from './zod.student.type';

const router = express.Router();

// get all student route
router.get('/:uid',Token_Verify("ADMIN","SUPER"),Student_Controller.Get_All_Student_Controller);

// get one student route
router.get('/one/:s_email',Token_Verify("ADMIN","SUPER","STUDENT"),Student_Controller.Get_One_Student_Controller);

// update student route
router.patch('/:s_email',Token_Verify("ADMIN","SUPER","STUDENT"),Zod_Validation_Request(Zod_UPDATE_Student_Type),Student_Controller.Udpate_Student_Controller)

export const Student_Routes = router;