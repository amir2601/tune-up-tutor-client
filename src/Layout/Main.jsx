import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';
import ScrollProgress from '../components/Shared/Animations/ScrollProgress';
import ScrollToTop from '../components/Shared/Animations/ScrollToTop';
import BackToTop from '../components/Shared/Animations/BackToTop';

const Main = () => {
    const location = useLocation();

    return (
        <div className='flex min-h-screen flex-col overflow-x-clip'>
            <ScrollProgress />
            <ScrollToTop />
            <Navbar />
            <main className='min-h-[calc(100vh-352px)] flex-1 py-6 md:px-4'>
                {/* Keyed by pathname so every route change plays a fresh entrance */}
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Outlet />
                </motion.div>
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Main;
