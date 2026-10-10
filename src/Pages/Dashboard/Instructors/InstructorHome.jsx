import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAddressCard, FaBook, FaArrowRight, FaChalkboardTeacher, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Reveal, Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';
import StatTile from '../../../components/Shared/Dashboard/StatTile';

const actions = [
    { to: '/dashboard/add-class', icon: <FaAddressCard />, title: 'Add a Class', text: 'Publish a new course for students to enrol in.', tint: 'bg-secondary/10 text-secondary' },
    { to: '/dashboard/my-class', icon: <FaBook />, title: 'My Classes', text: 'Review status, feedback and update your offerings.', tint: 'bg-primary/10 text-primary' },
];

const InstructorHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ total: 0, approved: 0, students: 0 });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}my-added-classes/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                const list = Array.isArray(data) ? data : [];
                setStats({
                    total: list.length,
                    approved: list.filter(c => c.status === 'approved').length,
                    students: list.reduce((sum, c) => sum + (Number(c.students) || 0), 0),
                });
            })
            .catch(() => {});
    }, [user]);

    return (
        <div className='mx-auto w-full max-w-6xl space-y-8'>
            <Reveal>
                <section className='surface relative overflow-hidden bg-gradient-to-br from-secondary via-brand-600 to-primary p-8 text-white sm:p-10'>
                    <div className='pointer-events-none absolute inset-0 bg-dots opacity-20' />
                    <div className='relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='space-y-3'>
                            <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]'>
                                <FaChalkboardTeacher /> Instructor Dashboard
                            </span>
                            <h2 className='text-3xl font-extrabold sm:text-4xl'>Welcome, {user.displayName}</h2>
                            <p className='max-w-lg text-white/80'>Create engaging courses, track enrolments and grow your students.</p>
                        </div>
                        <Link to="/dashboard/add-class" className='btn rounded-full border-0 bg-white text-secondary hover:bg-white/90 group'>
                            Add a Class <FaArrowRight className='text-xs transition-transform group-hover:translate-x-1' />
                        </Link>
                    </div>
                    <div className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl animate-float' />
                    <div className='pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-accent/30 blur-2xl animate-float-slow' />
                </section>
            </Reveal>

            <div className='grid gap-6 sm:grid-cols-3'>
                <StatTile icon={<FaBook />} label='Total classes' value={stats.total} tint='from-secondary to-pink-400' />
                <StatTile icon={<FaCheckCircle />} label='Approved classes' value={stats.approved} tint='from-success to-emerald-400' />
                <StatTile icon={<FaUsers />} label='Total students' value={stats.students} tint='from-primary to-brand-400' />
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
                            <span className='mt-2 inline-flex items-center gap-2 text-sm font-semibold text-secondary'>
                                Open <FaArrowRight className='text-xs transition-transform group-hover:translate-x-1' />
                            </span>
                        </Link>
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    );
};

export default InstructorHome;
