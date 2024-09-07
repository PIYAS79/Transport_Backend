

import express from 'express';
import { User_Routes } from '../modules/User/user.route';
import { Auth_Routes } from '../modules/Auth/auth.route';
import { Semester_Router } from '../modules/Semester/semester.route';
import { Semester_Card_Stack_Routes } from '../modules/Semester_Card_Stack/semesterCardStack.route';
import { Card_Router } from '../modules/Card/card.route';
import { Student_Routes } from '../modules/Student/student.route';
import { Faculty_Routes } from '../modules/Faculty/faculty.route';
import { Admin_Routes } from '../modules/Admin/admin.route';


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
    {
        path: '/semester/card',
        route: Semester_Card_Stack_Routes,
    },
    {
        path: '/card',
        route: Card_Router
    },
    {
        path:'/student',
        route:Student_Routes
    },
    {
        path:'/faculty',
        route:Faculty_Routes
    },
    {
        path:'/admin',
        route:Admin_Routes
    }
]


projectRoutes.forEach(one => router.use(one.path, one.route));


export default router;