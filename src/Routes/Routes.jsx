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
import PrivateRoutes from './PrivateRoutes';
import StudentHome from '../Pages/Dashboard/Student/StudentHome';
import AdminHome from '../Pages/Dashboard/Admin/AdminHome';
import SelectedClasses from '../Pages/Dashboard/Student/SelectedClasses';
import InstructorHome from '../Pages/Dashboard/Instructors/InstructorHome';
import AddClass from '../Pages/Dashboard/Instructors/AddClass';
import MyClasses from '../Pages/Dashboard/Instructors/MyClasses';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import CheckoutForm from '../components/Shared/Forms/CheckoutForm';
import Payment from '../components/Shared/Forms/Payment';
import EnrolledClass from '../Pages/Dashboard/Student/EnrolledClass';
import PaymentHistory from '../Pages/Dashboard/Student/PaymentHistory';

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
        element: <PrivateRoutes>
            <Dashboard></Dashboard>
        </PrivateRoutes>,
        children: [
            {
                path: '/dashboard/admin-home',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'manage-classes',
                element: <ManageClasses></ManageClasses>
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },

            // instructor
            {
                path: 'instructor-home',
                element: <InstructorHome></InstructorHome>
            },
            {
                path: 'add-class',
                element: <AddClass></AddClass>
            },
            {
                path: 'my-class',
                element: <MyClasses></MyClasses>
            },

            // student
            {
                path: 'student-home',
                element: <StudentHome></StudentHome>
            },
            {
                path: 'selected-classes',
                element: <SelectedClasses></SelectedClasses>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}classes/${params.id}`)
            },
            {
                path: 'enrolled-classes',
                element: <EnrolledClass></EnrolledClass>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            }
        ]
    }
]);

export default router;