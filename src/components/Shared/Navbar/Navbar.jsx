import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaMusic, FaBars, FaTimes, FaSignOutAlt, FaThLarge } from 'react-icons/fa';
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('user-role');
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserRole(data.role);
                localStorage.setItem('user-role', data.role);
            })
            .catch(() => {});
    }, [user]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const dashboardPath = userRole === 'admin'
        ? '/dashboard/admin-home'
        : userRole === 'instructor'
            ? '/dashboard/instructor-home'
            : '/dashboard/student-home';

    const avatar = user?.photoURL
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=7c3aed&color=fff`;

    const navLinkClass = ({ isActive }) =>
        `relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
            isActive
                ? 'bg-primary text-primary-content shadow-soft'
                : 'text-base-content/70 hover:bg-base-200 hover:text-primary'
        }`;

    const anchorClass = 'relative rounded-full px-4 py-2 text-sm font-semibold text-base-content/70 transition-all duration-300 hover:bg-base-200 hover:text-primary';

    const navItems = [
        { to: '/', label: 'Home', type: 'route' },
        { to: '/instructors', label: 'Instructors', type: 'route' },
        { to: '/classes', label: 'Classes', type: 'route' },
        { to: '/#pricing', label: 'Pricing', type: 'anchor' },
        { to: '/#gallery', label: 'Gallery', type: 'anchor' },
    ];

    return (
        <>
            <AnnouncementBar />
            <div
                className={`glass-nav sticky top-0 z-50 transition-shadow duration-300 ${
                    scrolled ? 'shadow-[0_10px_40px_-24px_rgba(15,23,42,0.45)]' : ''
                }`}
            >
            <div className="navbar mx-auto min-h-[4.5rem] max-w-7xl gap-2 px-4 sm:px-6 lg:px-8">
                <div className="navbar-start gap-1">
                    <Link to="/" className="group flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                        <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary via-brand-500 to-secondary text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
                            <span className="absolute inset-0 -z-10 rounded-2xl bg-primary/40 animate-pulse-ring" />
                            <FaMusic className="text-lg transition-transform duration-500 group-hover:rotate-12" />
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="text-lg font-extrabold tracking-tight">
                                Tune<span className="text-primary">Up</span>
                            </span>
                            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-base-content/40 sm:block">
                                Music Academy
                            </span>
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-1">
                        {navItems.map(item => (
                            <li key={item.label}>
                                {item.type === 'route' ? (
                                    <NavLink to={item.to} className={navLinkClass}>{item.label}</NavLink>
                                ) : (
                                    <Link to={item.to} className={anchorClass}>{item.label}</Link>
                                )}
                            </li>
                        ))}
                        {user?.email && userRole && (
                            <li><NavLink to={dashboardPath} className={navLinkClass}>Dashboard</NavLink></li>
                        )}
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <ThemeToggle className="hidden lg:inline-flex" />
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost h-auto gap-3 rounded-full px-2 py-1.5">
                                <div className="hidden text-right sm:flex sm:flex-col">
                                    <span className="max-w-[9rem] truncate text-sm font-bold leading-tight">
                                        {user?.displayName || 'Member'}
                                    </span>
                                    <span className="text-[11px] font-medium capitalize text-base-content/50">
                                        {userRole || 'account'}
                                    </span>
                                </div>
                                <div className="avatar online">
                                    <div className="w-10 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 transition group-hover:ring-primary">
                                        <img src={avatar} alt={user?.displayName || 'profile'} />
                                    </div>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu dropdown-content mt-3 w-60 rounded-2xl border border-base-300/70 bg-base-100 p-2 shadow-glow z-10">
                                <li className="pointer-events-none mb-1 px-3 py-2">
                                    <span className="truncate text-sm font-bold">{user?.displayName || 'Member'}</span>
                                    <span className="truncate text-xs font-normal text-base-content/50">{user?.email}</span>
                                </li>
                                <div className="my-1 h-px bg-base-300" />
                                <li>
                                    <Link to={dashboardPath} className="gap-3 rounded-xl font-semibold">
                                        <FaThLarge className="text-primary" /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="gap-3 rounded-xl font-semibold text-error">
                                        <FaSignOutAlt /> Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to='/login' className="btn btn-ghost btn-sm hidden rounded-full font-semibold sm:inline-flex">Log In</Link>
                            <Link to='/login' className="btn btn-primary btn-sm rounded-full px-5 font-semibold shadow-soft">
                                Get Started
                            </Link>
                        </>
                    )}

                    <button
                        type="button"
                        onClick={() => setMobileOpen(o => !o)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        className="btn btn-ghost btn-circle lg:hidden"
                    >
                        {mobileOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                    </button>
                </div>
            </div>

            {/* Animated mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-base-300/60 bg-base-100/95 backdrop-blur-lg lg:hidden"
                    >
                        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
                            {navItems.map((item, i) => (
                                <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                                >
                                    {item.type === 'route' ? (
                                        <NavLink
                                            to={item.to}
                                            onClick={() => setMobileOpen(false)}
                                            className={({ isActive }) =>
                                                `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                                    isActive ? 'bg-primary text-primary-content' : 'text-base-content/80 hover:bg-base-200'
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    ) : (
                                        <Link
                                            to={item.to}
                                            onClick={() => setMobileOpen(false)}
                                            className="block rounded-xl px-4 py-3 text-sm font-semibold text-base-content/80 transition hover:bg-base-200"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </motion.li>
                            ))}
                            {user?.email && userRole && (
                                <li>
                                    <NavLink
                                        to={dashboardPath}
                                        onClick={() => setMobileOpen(false)}
                                        className={({ isActive }) =>
                                            `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                                isActive ? 'bg-primary text-primary-content' : 'text-base-content/80 hover:bg-base-200'
                                            }`
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            )}
                            <li className="mt-1 flex items-center justify-between rounded-xl bg-base-200/60 px-4 py-2">
                                <span className="text-sm font-semibold text-base-content/80">Appearance</span>
                                <ThemeToggle variant="btn" showLabel />
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </>
    );
};

export default Navbar;
