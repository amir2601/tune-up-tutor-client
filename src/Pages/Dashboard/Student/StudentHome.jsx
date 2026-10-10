import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckDouble, FaCheckCircle, FaMoneyCheckAlt, FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Reveal, Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';
import StatTile from '../../../components/Shared/Dashboard/StatTile';

const actions = [
    { to: '/dashboard/selected-classes', icon: <FaCheckDouble />, title: 'Selected Classes', text: 'Classes waiting to be paid for.', tint: 'bg-primary/10 text-primary' },
    { to: '/dashboard/enrolled-classes', icon: <FaCheckCircle />, title: 'Enrolled Classes', text: 'Courses you are actively attending.', tint: 'bg-secondary/10 text-secondary' },
    { to: '/dashboard/payment-history', icon: <FaMoneyCheckAlt />, title: 'Payment History', text: 'Review your past transactions.', tint: 'bg-accent/10 text-accent' },
];

const StudentHome = () => {
    const { user } = useContext(AuthContext);
    const [counts, setCounts] = useState({ selected: 0, enrolled: 0, payments: 0 });

    useEffect(() => {
        const base = import.meta.env.VITE_API_URL;
        Promise.all([
            fetch(`${base}select-class/${user?.email}`).then(r => r.json()).catch(() => []),
            fetch(`${base}enrolled-classes/${user?.email}`).then(r => r.json()).catch(() => []),
            fetch(`${base}payment-history/${user?.email}`).then(r => r.json()).catch(() => []),
        ]).then(([selected, enrolled, payments]) => {
            setCounts({
                selected: Array.isArray(selected) ? selected.length : 0,
                enrolled: Array.isArray(enrolled) ? enrolled.length : 0,
                payments: Array.isArray(payments) ? payments.length : 0,
            });
        });
    }, [user]);

    return (
        <div className='mx-auto w-full max-w-6xl space-y-8'>
            <Reveal>
                <section className='surface relative overflow-hidden bg-gradient-to-br from-primary via-brand-600 to-secondary p-8 text-white sm:p-10'>
                    <div className='pointer-events-none absolute inset-0 bg-dots opacity-20' />
                    <div className='relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between'>
                        <div className='space-y-3'>
                            <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]'>
                                <FaGraduationCap /> Student Dashboard
                            </span>
                            <h2 className='text-3xl font-extrabold sm:text-4xl'>Welcome, {user.displayName}</h2>
                            <p className='max-w-lg text-white/80'>Track your selected classes, continue learning and manage your payments — all in one place.</p>
                        </div>
                        <Link to="/classes" className='btn rounded-full border-0 bg-white text-primary hover:bg-white/90 group'>
                            Browse Classes <FaArrowRight className='text-xs transition-transform group-hover:translate-x-1' />
                        </Link>
                    </div>
                    <div className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl animate-float' />
                    <div className='pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-accent/30 blur-2xl animate-float-slow' />
                </section>
            </Reveal>

            <div className='grid gap-6 sm:grid-cols-3'>
                <StatTile icon={<FaCheckDouble />} label='Selected classes' value={counts.selected} tint='from-primary to-brand-400' />
                <StatTile icon={<FaCheckCircle />} label='Enrolled classes' value={counts.enrolled} tint='from-secondary to-pink-400' />
                <StatTile icon={<FaMoneyCheckAlt />} label='Payments made' value={counts.payments} tint='from-accent to-cyan-400' />
            </div>

            <Stagger className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3' stagger={0.1}>
                {actions.map(action => (
                    <StaggerItem key={action.title}>
                        <Link key={action.title} to={action.to} className='surface hover-lift card-shine group flex h-full flex-col gap-3 bg-base-100 p-6'>
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

export default StudentHome;
