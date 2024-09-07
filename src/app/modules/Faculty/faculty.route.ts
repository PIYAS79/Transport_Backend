


import express from 'express';
import Token_Verify from '../../middlewares/token.validation';
import { Faculty_Controller } from './faculty.controller';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_UPDATE_Faculty_Type } from './zod.faculty.type';


const router = express.Router();

// get all faculty route
router.get('/:uid',Token_Verify("ADMIN","SUPER"),Faculty_Controller.Get_All_Faculty_Controller);

// get one faculty route
router.get('/one/:f_email',Token_Verify("ADMIN","SUPER","FACULTY"),Faculty_Controller.Get_One_Faculty_Controller);

// update faculty route
router.patch('/:f_email',Token_Verify("ADMIN","SUPER","FACULTY"),Zod_Validation_Request(Zod_UPDATE_Faculty_Type),Faculty_Controller.Udpate_Faculty_Controller)





export const Faculty_Routes= router;