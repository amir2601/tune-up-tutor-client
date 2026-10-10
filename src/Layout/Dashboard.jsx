import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollProgress from '../components/Shared/Animations/ScrollProgress';
import BackToTop from '../components/Shared/Animations/BackToTop';
import ThemeToggle from '../components/Shared/ThemeToggle/ThemeToggle';
import { FaAddressCard, FaBook, FaCheckCircle, FaCheckDouble, FaHome, FaMoneyCheckAlt, FaUsers, FaBars, FaMusic, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const userRole = localStorage.getItem('user-role');
    const location = useLocation();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('user-role')
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const avatar = user?.photoURL
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=7c3aed&color=fff`;

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            isActive
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-soft'
                : 'text-neutral-content/70 hover:bg-white/10 hover:text-white'
        }`;

    const GroupLabel = ({ children }) => (
        <p className='px-4 pb-2 pt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-content/40'>
            {children}
        </p>
    );

    return (
        <div className="drawer lg:drawer-open">
            <ScrollProgress />
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex min-h-screen flex-col bg-base-200">
                <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-base-300/70 bg-base-100/80 px-4 py-3 backdrop-blur-lg lg:px-8">
                    <div className="flex items-center gap-3">
                        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle lg:hidden">
                            <FaBars className="text-lg" />
                        </label>
                        <div className='leading-tight'>
                            <p className='text-sm font-bold capitalize'>{userRole || 'Dashboard'} Dashboard</p>
                            <p className='text-xs text-base-content/50'>Welcome back, {user?.displayName || 'Member'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Link to="/" className="btn btn-outline btn-sm rounded-full">Back to site</Link>
                    </div>
                </header>

                <div className="flex-1 p-4 lg:p-8">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </div>

            <div className="drawer-side z-40">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <aside className="flex h-full w-72 flex-col bg-neutral text-neutral-content">
                    <Link to="/" className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5 transition hover:bg-white/5">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-soft">
                            <FaMusic className="text-lg" />
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-white">
                            Tune<span className="text-primary">Up</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-3 px-5 py-5">
                        <div className="avatar">
                            <div className="w-12 rounded-full ring-2 ring-primary/40">
                                <img src={avatar} alt={user?.displayName || 'profile'} />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-white">{user?.displayName || 'Member'}</p>
                            <p className="truncate text-xs capitalize text-neutral-content/60">{userRole || 'account'}</p>
                        </div>
                    </div>

                    <nav className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4">
                        {
                            userRole === 'admin' && <>
                                <GroupLabel>Overview</GroupLabel>
                                <NavLink to="/" className={linkClass} end><FaHome /> Home</NavLink>
                                <NavLink to="/dashboard/admin-home" className={linkClass}><FaHome /> Admin Home</NavLink>
                                <GroupLabel>Management</GroupLabel>
                                <NavLink to="/dashboard/manage-classes" className={linkClass}><FaBook /> Manage Classes</NavLink>
                                <NavLink to="/dashboard/manage-users" className={linkClass}><FaUsers /> Manage Users</NavLink>
                            </>
                        }
                        {
                            userRole === 'student' && <>
                                <GroupLabel>Learning</GroupLabel>
                                <NavLink to="/" className={linkClass} end><FaHome /> Home</NavLink>
                                <NavLink to="/dashboard/student-home" className={linkClass}><FaHome /> Student Home</NavLink>
                                <NavLink to="/dashboard/selected-classes" className={linkClass}><FaCheckDouble /> My Selected Classes</NavLink>
                                <NavLink to="/dashboard/enrolled-classes" className={linkClass}><FaCheckCircle /> My Enrolled Classes</NavLink>
                                <NavLink to="/dashboard/payment-history" className={linkClass}><FaMoneyCheckAlt /> Payments History</NavLink>
                            </>
                        }
                        {
                            userRole === 'instructor' && <>
                                <GroupLabel>Teaching</GroupLabel>
                                <NavLink to="/" className={linkClass} end><FaHome /> Home</NavLink>
                                <NavLink to="/dashboard/instructor-home" className={linkClass}><FaHome /> Instructor Home</NavLink>
                                <NavLink to="/dashboard/add-class" className={linkClass}><FaAddressCard /> Add a Class</NavLink>
                                <NavLink to="/dashboard/my-class" className={linkClass}><FaBook /> My Classes</NavLink>
                            </>
                        }
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <button onClick={handleLogOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-content/70 transition hover:bg-error/20 hover:text-white">
                            <FaSignOutAlt /> Log Out
                        </button>
                        <p className="mt-3 flex items-center gap-2 px-4 text-[11px] text-neutral-content/40">
                            <FaUserCircle /> TuneUp Tutor
                        </p>
                    </div>
                </aside>
            </div>
            <BackToTop />
        </div>
    );
};

export default Dashboard;
