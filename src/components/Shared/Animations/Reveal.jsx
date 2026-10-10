import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 48, y: 0 },
    right: { x: -48, y: 0 },
    none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal wrapper.
 * @param {'up'|'down'|'left'|'right'|'none'} direction
 */
export const Reveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.7,
    className = '',
    once = true,
    amount = 0.2,
    as = 'div',
    ...rest
}) => {
    const off = offsets[direction] || offsets.up;
    const MotionTag = motion[as] || motion.div;

    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, ...off }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

/** Container that staggers the animation of its <StaggerItem/> children. */
export const Stagger = ({
    children,
    className = '',
    stagger = 0.09,
    delayChildren = 0,
    once = true,
    amount = 0.15,
    as = 'div',
}) => {
    const MotionTag = motion[as] || motion.div;
    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: stagger, delayChildren } },
            }}
        >
            {children}
        </MotionTag>
    );
};

export const StaggerItem = ({ children, className = '', direction = 'up', as = 'div', ...rest }) => {
    const off = offsets[direction] || offsets.up;
    const MotionTag = motion[as] || motion.div;
    return (
        <MotionTag
            className={className}
            variants={{
                hidden: { opacity: 0, ...off },
                visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
};

export default Reveal;
