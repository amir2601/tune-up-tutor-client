import React, { useContext } from 'react';
import logo from '../../../assets/logo.png'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error.message);
            })
    }

    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/instructors">Instructors</NavLink></li>
        <li><NavLink to="/classes">Classes</NavLink></li>
        <li><NavLink to="/dashboard ">Dashboard </NavLink></li>
        {/* {
            user?.email && <>
                <li><NavLink to='/addToy'>Add Toys</NavLink></li>
                <li><NavLink to='/myToys'>My Toys</NavLink></li>
            </>
        } */}

    </>

    return (
        <div className="navbar bg-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
                        {navItems}
                    </ul>
                </div>
                <img className='w-44 hidden md:flex' src={logo} alt="logo" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
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