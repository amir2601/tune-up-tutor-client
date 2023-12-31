import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null)
    console.log(userRole);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('user-role')
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserRole(data.role)
                localStorage.setItem('user-role', data.role)
            })
    }, [user])

    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/instructors">Instructors</NavLink></li>
        <li><NavLink to="/classes">Classes</NavLink></li>
        {
            user?.email && userRole === 'admin' && <li><NavLink to='/dashboard/admin-home'>Dashboard </NavLink></li>
        }
        {
            user?.email && userRole === 'instructor' && <li><NavLink to='/dashboard/instructor-home'>Dashboard </NavLink></li>
        }
        {
            user?.email && userRole === 'student' && <li><NavLink to='/dashboard/student-home'>Dashboard </NavLink></li>
        }
    </>

    return (
        <div className="navbar bg-base">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
                        {navItems}
                    </ul>
                </div>
                <Link to="/"><img className='w-44 hidden md:flex' src="https://i.ibb.co/s2KrMhF/logo.png" alt="logo" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex justify-center items-center">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <Link onClick={handleLogOut} className="btn btn-outline btn-accent btn-sm mr-4">Log Out</Link>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                    </> : <Link to='/login' className="btn btn-outline btn-accent btn-sm">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;