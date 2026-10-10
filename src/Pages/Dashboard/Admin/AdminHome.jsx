import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaArrowRight, FaUserShield, FaClock } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Reveal, Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';
import StatTile from '../../../components/Shared/Dashboard/StatTile';

const actions = [
    { to: '/dashboard/manage-classes', icon: <FaBook />, title: 'Manage Classes', text: 'Approve, deny or leave feedback on submitted classes.', tint: 'bg-primary/10 text-primary' },
    { to: '/dashboard/manage-users', icon: <FaUsers />, title: 'Manage Users', text: 'Promote members to instructors or administrators.', tint: 'bg-accent/10 text-accent' },
];

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ classes: 0, pending: 0, users: 0 });

    useEffect(() => {
        const base = import.meta.env.VITE_API_URL;
        Promise.all([
            fetch(`${base}added-classes`).then(r => r.json()).catch(() => []),
            fetch(`${base}users`).then(r => r.json()).catch(() => []),
        ]).then(([classes, users]) => {
            const list = Array.isArray(classes) ? classes : [];
            setStats({
                classes: list.length,
                pending: list.filter(c => c.status === 'pending').length,
                users: Array.isArray(users) ? users.length : 0,
            });
        });
    }, []);

    return (
        <div className='mx-auto w-full max-w-6xl space-y-8'>
            <Reveal>
                <section className='surface relative overflow-hidden bg-gradient-to-br from-neutral via-slate-800 to-primary p-8 text-white sm:p-10'>
                    <div className='pointer-events-none absolute inset-0 bg-grid opacity-[0.12]' />
                    <div className='relative z-10 space-y-3'>
                        <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]'>
                            <FaUserShield /> Admin Dashboard
                        </span>
                        <h2 className='text-3xl font-extrabold sm:text-4xl'>Welcome, {user.displayName}</h2>
                        <p className='max-w-lg text-white/80'>Keep the platform running smoothly — moderate classes and manage your community.</p>
                    </div>
                    <div className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/40 blur-2xl animate-float' />
                    <div className='pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-accent/25 blur-2xl animate-float-slow' />
                </section>
            </Reveal>

            <div className='grid gap-6 sm:grid-cols-3'>
                <StatTile icon={<FaBook />} label='Total classes' value={stats.classes} tint='from-primary to-brand-400' />
                <StatTile icon={<FaClock />} label='Pending review' value={stats.pending} tint='from-warning to-amber-400' />
                <StatTile icon={<FaUsers />} label='Registered users' value={stats.users} tint='from-accent to-cyan-400' />
            </div>

            <Stagger className='grid gap-6 sm:grid-cols-2' stagger={0.1}>
                {actions.map(action => (
                    <StaggerItem key={action.title}>
                        <Link to={action.to} className='surface hover-lift card-shine group flex h-full flex-col gap-3 bg-base-100 p-6'>
                            <span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl ${action.tint}`}>
                                {action.icon}
                            </span>
                            <h3 className='text-lg font-bold'>{action.title}</h3>
                            <p className='text-sm text-base-content/60'>{action.text}</p>
                            <span className='mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary'>
                                Open <FaArrowRight className='text-xs transition-transform group-hover:translate-x-1' />
                            </span>
                        </Link>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    );
};

export default AdminHome;
