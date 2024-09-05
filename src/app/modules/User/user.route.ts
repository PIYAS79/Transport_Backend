


import express from 'express';
import { User_Controllers } from './user.controllers';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_User_Type } from './user.zod.validation.type';


const router = express.Router();

// create user route
router.post('/', Zod_Validation_Request(Zod_User_Type), User_Controllers.Create_User_Controller)





export const User_Routes = router;