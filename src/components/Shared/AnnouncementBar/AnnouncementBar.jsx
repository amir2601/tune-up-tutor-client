import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBullhorn, FaTimes, FaArrowRight } from 'react-icons/fa';

const STORAGE_KEY = 'tuneup-announcement';

/** Slim, dismissible promo bar shown above the navigation. */
const AnnouncementBar = () => {
    const [open, setOpen] = useState(() => {
        try {
            return sessionStorage.getItem(STORAGE_KEY) !== 'hidden';
        } catch {
            return true;
        }
    });

    const dismiss = () => {
        setOpen(false);
        try {
            sessionStorage.setItem(STORAGE_KEY, 'hidden');
        } catch {
            /* ignore */
        }
    };

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden bg-gradient-to-r from-primary via-brand-600 to-secondary text-white"
                >
                    <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
                    <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2 text-center text-xs font-semibold sm:gap-3 sm:px-10 sm:text-sm">
                        <FaBullhorn className="hidden shrink-0 animate-wave sm:block" />
                        <p className="min-w-0 truncate">
                            🎉 New here? Get <span className="font-extrabold">20% off</span> your first month
                            with code{' '}
                            <span className="rounded-md bg-white/20 px-1.5 py-0.5 font-mono tracking-wider">
                                TUNE20
                            </span>
                        </p>
                        <Link
                            to="/sign-up"
                            className="hidden shrink-0 items-center gap-1 underline underline-offset-2 transition hover:no-underline sm:inline-flex"
                        >
                            Claim now <FaArrowRight className="text-[10px]" />
                        </Link>
                        <button
                            type="button"
                            onClick={dismiss}
                            aria-label="Dismiss announcement"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/80 transition hover:bg-white/20 hover:text-white sm:right-3"
                        >
                            <FaTimes className="text-xs" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnnouncementBar;
