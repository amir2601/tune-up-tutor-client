import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Instructors from '../Pages/Instructors/Instructors';
import Error from '../Pages/Error/Error';
import Classes from '../Pages/Classes/Classes';
import Dashboard from '../Layout/Dashboard';
import StudentHome from '../Pages/Dashboard/StudentHome/StudentHome';
import AdminHome from '../Pages/Dashboard/AdminHome/AdminHome';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/sign-up',
                element: <Register></Register>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/student-home',
                element: <StudentHome></StudentHome>
            },
            {
                path: '/dashboard/admin-home',
                element: <AdminHome></AdminHome>
            }
        ]
    }
]);

export default router;