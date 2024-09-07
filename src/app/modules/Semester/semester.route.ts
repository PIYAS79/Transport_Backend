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

// get all semester route
router.get('/',Semester_Controller.Get_All_Semester_Controller);
// get all semester route
router.get('/:sem_id',Semester_Controller.Get_One_Semester_Controller);

// get one semester route










export const Semester_Router = router;