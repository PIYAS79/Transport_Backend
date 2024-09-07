


import express from 'express';
import Token_Verify from '../../middlewares/token.validation';
import Zod_Validation_Request from '../../middlewares/validation.request';
import { Zod_One_Pass_Card_Type } from './zod.card.type';
import { Card_Controller } from './card.controller';

const router = express.Router();

// create one way pass out route 
router.post('/onepass',Token_Verify("ADMIN","FACULTY","SUPER","STUDENT"),Zod_Validation_Request(Zod_One_Pass_Card_Type),Card_Controller.Create_One_Way_Pass_Card)

// semester card expire by user
//=> may be not required right now

// semester card expire confirmed by admin
//=> may be not required right now

// get a user all cards route
router.get('/:uid',Token_Verify("ADMIN","FACULTY","SUPER","STUDENT"),Card_Controller.Get_A_User_All_Cards)

// get all card route
router.get('/:uid',Token_Verify("ADMIN","SUPER"),Card_Controller.Get_All_Cards_Controller)

export const Card_Router = router;