import express from 'express'
import Token_Verify from '../../middlewares/token.validation';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_Semester_Type, Zod_Semester_Update_Type } from './zod.semester.type';
import { Semester_Controller } from './semester.controller';



const router = express.Router();

// create semester route
router.post('/',Token_Verify("ADMIN","SUPER"),Zod_Validation_Request(Zod_Semester_Type),Semester_Controller.Create_Semester_Controller)

// update semester route
router.patch('/:sid',Token_Verify("ADMIN","SUPER"),Zod_Validation_Request(Zod_Semester_Update_Type),Semester_Controller.Semester_Update_Controller)

// delete semester route 
router.delete('/:sid',Token_Verify("ADMIN","SUPER"),Semester_Controller.Semester_Delete_Controller)











export const Semester_Router = router;