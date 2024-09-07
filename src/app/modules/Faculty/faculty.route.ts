


import express from 'express';
import Token_Verify from '../../middlewares/token.validation';
import { Faculty_Controller } from './faculty.controller';


const router = express.Router();

// get all faculty route
router.get('/:uid',Token_Verify("ADMIN","SUPER"),Faculty_Controller.Get_All_Faculty_Controller);

// get one faculty route
router.get('/one/:f_email',Token_Verify("ADMIN","SUPER","FACULTY"),Faculty_Controller.Get_One_Faculty_Controller);


export const Faculty_Routes= router;