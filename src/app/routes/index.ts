

import express from 'express';
import { User_Routes } from '../modules/User/user.route';


const router = express.Router();

const projectRoutes = [
    {
        path: '/user',
        route: User_Routes,
    },
]


projectRoutes.forEach(one => router.use(one.path, one.route));


export default router;