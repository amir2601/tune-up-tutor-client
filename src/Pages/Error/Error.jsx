import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useTitle from '../../Hooks/useTitle';
import { FaHome, FaMusic } from 'react-icons/fa';

const Error = () => {
    useTitle('Error');

    return (
        <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-neutral via-slate-800 to-primary px-6 text-center text-white'>
            <div className='pointer-events-none absolute inset-0 bg-dots opacity-20' />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className='relative z-10 space-y-6'
            >
                <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
                    className='mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white/10 text-2xl backdrop-blur animate-float'
                >
                    <FaMusic />
                </motion.span>
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className='text-7xl font-extrabold tracking-tight sm:text-8xl'
                >
                    404
                </motion.p>
                <h1 className='text-2xl font-bold sm:text-3xl'>This page is out of tune</h1>
                <p className='mx-auto max-w-md text-white/70'>
                    The page you're looking for doesn't exist or has moved. Let's get you back to the music.
                </p>
                <Link to="/" className='btn mx-auto w-fit rounded-full border-0 bg-white text-primary hover:bg-white/90'>
                    <FaHome /> Back To Home
                </Link>
            </motion.div>

            <div className='pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float' />
            <div className='pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float-slow' />
        </div>
    );
};

export default Error;
