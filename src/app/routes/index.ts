

import express from 'express';
import { User_Routes } from '../modules/User/user.route';
import { Auth_Routes } from '../modules/Auth/auth.route';
import { Semester_Router } from '../modules/Semester/semester.route';


const router = express.Router();

const projectRoutes = [
    {
        path: '/user',
        route: User_Routes,
    },
    {
        path: '/auth',
        route: Auth_Routes,
    },
    {
        path: '/semester',
        route: Semester_Router,
    },
]


projectRoutes.forEach(one => router.use(one.path, one.route));


export default router;