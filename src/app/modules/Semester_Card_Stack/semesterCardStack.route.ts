import express from 'express'
import Token_Verify from '../../middlewares/token.validation';
import { Semester_Card_Stack_Controller } from './semesterCardStack.controller';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_SemesterCardStack_Type, Zod_SemesterCardStack_User_Withdraw_Type } from './zod.semesterCardStack.type';


const router = express.Router()


// user = create a request 
router.post('/request',Token_Verify("ADMIN","STUDENT","SUPER","FACULTY"),Zod_Validation_Request(Zod_SemesterCardStack_Type),Semester_Card_Stack_Controller.Card_Request_Controller)
// user = withdraw request 
router.patch('/withdraw',Token_Verify("ADMIN","STUDENT","SUPER","FACULTY"),Zod_Validation_Request(Zod_SemesterCardStack_User_Withdraw_Type),Semester_Card_Stack_Controller.Request_Withdraw_By_User_Controller)
// admin = withdraw confirm route
router.delete('/withdraw',Token_Verify("ADMIN","SUPER"),Semester_Card_Stack_Controller.Withdraw_Confirm_By_Admin_Controller)



export const Semester_Card_Stack_Routes = router;