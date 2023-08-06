import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { NavLink, Outlet } from 'react-router-dom';
import { FaAddressCard, FaBook, FaCheckCircle, FaCheckDouble, FaHome, FaMoneyCheckAlt, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const userRole = localStorage.getItem('user-role');

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-outline btn-sm drawer-button lg:hidden mt-20">Open Menu</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {
                        userRole === 'admin' && <>
                            <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                            <li><NavLink to="/dashboard/admin-home"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/manage-classes"><FaBook></FaBook> Manage Classes</NavLink></li>
                            <li><NavLink to="/dashboard/manage-users"><FaUsers></FaUsers> Manage Users</NavLink></li>
                        </>
                    }
                    {
                        userRole === 'student' && <>
                            <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                            <li><NavLink to="/dashboard/student-home"><FaHome></FaHome> Student Home</NavLink></li>
                            <li><NavLink to="/dashboard/selected-classes"><FaCheckDouble></FaCheckDouble> My Selected Classes</NavLink></li>
                            <li><NavLink to="/dashboard/enrolled-classes"><FaCheckCircle></FaCheckCircle> My Enrolled Classes</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history"><FaMoneyCheckAlt></FaMoneyCheckAlt> Payments History</NavLink></li>
                        </>
                    }
                    {
                        userRole === 'instructor' && <>
                            <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                            <li><NavLink to="/dashboard/instructor-home"><FaHome></FaHome> Instructor Home</NavLink></li>
                            <li><NavLink to="/dashboard/add-class"><FaAddressCard></FaAddressCard> Add a Class</NavLink></li>
                            <li><NavLink to="/dashboard/my-class"><FaBook></FaBook> My Classes</NavLink></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;