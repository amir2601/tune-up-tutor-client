import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient progress bar pinned to the very top of the viewport. */
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-primary via-secondary to-accent"
            aria-hidden
        />
    );
};

export default ScrollProgress;
