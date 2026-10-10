import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaStar, FaPlay, FaGraduationCap } from 'react-icons/fa';
import guitarImg from '../../../assets/slider/guitar.jpg';
import drumImg from '../../../assets/slider/drum.jpg';
import pianoImg from '../../../assets/slider/piano.jpg';
import fluteImg from '../../../assets/slider/flute.jpg';

const AUTOPLAY = 6500;

const slides = [
    {
        img: guitarImg,
        tag: 'Guitar • Acoustic & Electric',
        pre: 'Unlock your',
        hi: 'musical journey',
        post: 'with expert guidance',
        text: 'Personalised one-on-one lessons from award-winning musicians, built around your pace and goals.',
    },
    {
        img: drumImg,
        tag: 'Drums • Rhythm & Groove',
        pre: 'Embrace the',
        hi: 'rhythm of your dreams',
        post: 'one lesson at a time',
        text: 'Find your beat with structured courses designed for absolute beginners and seasoned pros alike.',
    },
    {
        img: pianoImg,
        tag: 'Piano • Classical & Modern',
        pre: 'Ignite your',
        hi: 'musical prowess',
        post: 'with world-class mentors',
        text: 'From your first notes to full performances — our mentors make every single session count.',
    },
    {
        img: fluteImg,
        tag: 'Flute • Wind & Soul',
        pre: 'Let the music',
        hi: 'guide your soul',
        post: 'every single day',
        text: 'Join thousands of learners discovering their unique sound with Tune Up Tutor.',
    },
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const item = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Slider = () => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = slides.length;

    const go = useCallback((dir) => setIndex(i => (i + dir + count) % count), [count]);

    useEffect(() => {
        if (paused) return;
        const timer = setTimeout(() => go(1), AUTOPLAY);
        return () => clearTimeout(timer);
    }, [index, paused, go]);

    // Pause autoplay when the tab is hidden
    useEffect(() => {
        const onVisibility = () => setPaused(document.hidden);
        document.addEventListener('visibilitychange', onVisibility);
        return () => document.removeEventListener('visibilitychange', onVisibility);
    }, []);

    const slide = slides[index];

    return (
        <section className="px-4 md:px-0">
            <div
                className="group relative h-[80vh] max-h-[820px] min-h-[520px] w-full overflow-hidden rounded-4xl shadow-glow-lg sm:min-h-[600px]"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Crossfading backgrounds with a slow Ken Burns zoom */}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={slide.img}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.1, ease: 'easeInOut' }}
                    >
                        <motion.img
                            src={slide.img}
                            alt={slide.tag}
                            className="h-full w-full object-cover"
                            initial={{ scale: 1.15 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: AUTOPLAY / 1000 + 2, ease: 'linear' }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Readability overlays */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral/95 via-neutral/75 to-neutral/20" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral/90 via-transparent to-neutral/30" />

                {/* Floating decorative blobs */}
                <div className="pointer-events-none absolute -right-10 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl animate-float" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-accent/20 blur-3xl animate-float-slow" />

                {/* Foreground content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="page-shell w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                variants={container}
                                initial="hidden"
                                animate="visible"
                                className="max-w-2xl space-y-6 text-white"
                            >
                                <motion.span
                                    variants={item}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur"
                                >
                                    <FaStar className="text-secondary" /> {slide.tag}
                                </motion.span>

                                <motion.h1
                                    variants={item}
                                    className="text-balance text-4xl font-extrabold leading-[1.05] drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl"
                                >
                                    {slide.pre}{' '}
                                    <span className="bg-gradient-to-r from-brand-300 via-secondary to-accent bg-clip-text text-transparent">
                                        {slide.hi}
                                    </span>{' '}
                                    {slide.post}
                                </motion.h1>

                                <motion.p variants={item} className="max-w-xl text-sm text-white/75 sm:text-base md:text-lg">
                                    {slide.text}
                                </motion.p>

                                <motion.div variants={item} className="flex flex-wrap items-center gap-3">
                                    <Link to="/classes" className="btn btn-primary group/btn rounded-full px-6 shadow-glow border-0">
                                        Browse Classes
                                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </Link>
                                    <Link
                                        to="/#gallery"
                                        className="btn btn-outline rounded-full border-white/40 px-5 text-white hover:border-white hover:bg-white hover:text-neutral"
                                    >
                                        <FaPlay className="text-xs" /> Watch gallery
                                    </Link>
                                </motion.div>

                                <motion.div variants={item} className="hidden flex-wrap items-center gap-6 pt-2 text-sm sm:flex">
                                    <div>
                                        <p className="text-2xl font-extrabold">4.9<span className="text-base text-white/60">/5</span></p>
                                        <p className="text-white/60">Average rating</p>
                                    </div>
                                    <div className="hidden h-10 w-px bg-white/20 sm:block" />
                                    <div>
                                        <p className="text-2xl font-extrabold">10k+</p>
                                        <p className="text-white/60">Happy students</p>
                                    </div>
                                    <div className="hidden h-10 w-px bg-white/20 sm:block" />
                                    <div>
                                        <p className="text-2xl font-extrabold">120+</p>
                                        <p className="text-white/60">Expert tutors</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Floating glass card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    className="pointer-events-none absolute bottom-28 right-6 hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-xl lg:block animate-float"
                >
                    <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg">
                            <FaGraduationCap />
                        </span>
                        <div>
                            <p className="text-lg font-extrabold leading-none">10,000+</p>
                            <p className="text-xs text-white/70">students enrolled</p>
                        </div>
                    </div>
                </motion.div>

                {/* Arrows */}
                <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between sm:left-6 sm:right-6">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous slide"
                        className="btn btn-circle border-0 bg-white/15 text-white backdrop-blur transition hover:bg-primary"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next slide"
                        className="btn btn-circle border-0 bg-white/15 text-white backdrop-blur transition hover:bg-primary"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Dots + autoplay progress */}
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
                    <div className="flex items-center gap-2">
                        {slides.map((s, i) => (
                            <button
                                key={s.img}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === index ? 'w-9 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                                }`}
                            />
                        ))}
                    </div>
                    <div className="relative hidden h-1 w-24 overflow-hidden rounded-full bg-white/20 sm:block">
                        <motion.div
                            key={index}
                            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: paused ? 0.35 : 1 }}
                            transition={{ duration: paused ? 0.3 : AUTOPLAY / 1000, ease: 'linear' }}
                        />
                    </div>
                </div>

                {/* Scroll cue */}
                <motion.div
                    aria-hidden
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-6 right-6 hidden h-10 w-6 rounded-full border-2 border-white/40 sm:block"
                >
                    <span className="mx-auto mt-1.5 block h-2 w-1 rounded-full bg-white/70" />
                </motion.div>
            </div>
        </section>
    );
};

export default Slider;
