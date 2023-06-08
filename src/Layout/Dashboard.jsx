import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const userRole = localStorage.getItem('user-role');

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {
                        userRole === 'admin' && <>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/dashboard/admin-home">Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/manage-classes">Manage Classes</NavLink></li>
                            <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>
                        </>
                    }
                    {
                        userRole === 'student' && <>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/dashboard/student-home">Student Home</NavLink></li>
                            <li><NavLink to="/dashboard/my-selected-classes">My Selected Classes</NavLink></li>
                            <li><NavLink to="/dashboard/my-enrolled-classes">My Enrolled Classes</NavLink></li>
                        </>
                    }
                    {
                        userRole === 'instructor' && <>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/dashboard/instructor-home">Instructor Home</NavLink></li>
                            <li><NavLink to="/dashboard/add-class">Add a Class</NavLink></li>
                            <li><NavLink to="/dashboard/my-class">My Classes</NavLink></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;