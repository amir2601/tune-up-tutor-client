import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMusic, FaPlay } from 'react-icons/fa';
import { Reveal } from '../../../components/Shared/Animations/Reveal';

const notes = [
    { top: '12%', left: '8%', size: 'text-3xl', delay: 0 },
    { top: '68%', left: '12%', size: 'text-xl', delay: 0.6 },
    { top: '22%', left: '86%', size: 'text-2xl', delay: 1.1 },
    { top: '72%', left: '80%', size: 'text-4xl', delay: 0.3 },
    { top: '44%', left: '50%', size: 'text-lg', delay: 1.5 },
];

const CtaBanner = () => {
    return (
        <section className="px-4 md:px-0">
            <Reveal direction="up">
                <div className="relative overflow-hidden rounded-5xl bg-gradient-to-br from-primary via-brand-600 to-secondary px-6 py-16 text-center text-white shadow-glow-lg sm:px-12 sm:py-20">
                    <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
                    <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    {notes.map((n, i) => (
                        <motion.span
                            key={i}
                            aria-hidden
                            className={`pointer-events-none absolute ${n.size} text-white/25`}
                            style={{ top: n.top, left: n.left }}
                            animate={{ y: [0, -16, 0], rotate: [0, 12, 0], opacity: [0.15, 0.4, 0.15] }}
                            transition={{ duration: 6, delay: n.delay, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <FaMusic />
                        </motion.span>
                    ))}

                    <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
                            <FaPlay className="text-[10px]" /> Your first lesson awaits
                        </span>
                        <h2 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                            Ready to make some noise?
                        </h2>
                        <p className="mx-auto max-w-xl text-white/80">
                            Join a global community of musicians. Book a class in minutes and feel the difference from your very first note.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link to="/classes" className="btn group rounded-full border-0 bg-white px-7 text-primary hover:bg-white/90">
                                Browse Classes
                                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link to="/sign-up" className="btn rounded-full border-white/40 bg-transparent px-7 text-white hover:border-white hover:bg-white hover:text-neutral">
                                Create free account
                            </Link>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default CtaBanner;
