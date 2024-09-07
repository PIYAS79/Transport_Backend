import express from 'express';
import Token_Verify from '../../middlewares/token.validation';
import { Student_Controller } from './student.controller';

const router = express.Router();

// get all student route
router.get('/:uid',Token_Verify("ADMIN","SUPER"),Student_Controller.Get_All_Student_Controller);

// get one student route
router.get('/one/:s_email',Token_Verify("ADMIN","SUPER","STUDENT"),Student_Controller.Get_One_Student_Controller);

export const Student_Routes = router;