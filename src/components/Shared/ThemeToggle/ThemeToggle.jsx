import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../../Provider/ThemeProvider';

/**
 * Animated light/dark theme switch.
 * @param {'btn'|'icon'} variant - `btn` renders a labelled pill, `icon` a round icon button.
 */
const ThemeToggle = ({ variant = 'icon', className = '', showLabel = false }) => {
    const { isDark, toggleTheme } = useTheme();

    const icon = (
        <AnimatePresence mode="wait" initial={false}>
            <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="grid place-items-center text-lg"
            >
                {isDark ? <FaSun className="text-warning" /> : <FaMoon className="text-primary" />}
            </motion.span>
        </AnimatePresence>
    );

    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    if (variant === 'btn') {
        return (
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={label}
                title={label}
                className={`btn btn-ghost gap-2 rounded-full ${className}`}
            >
                {icon}
                {showLabel && <span>{isDark ? 'Light' : 'Dark'}</span>}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={label}
            title={label}
            className={`btn btn-ghost btn-circle relative overflow-hidden ${className}`}
        >
            {icon}
        </button>
    );
};

export default ThemeToggle;
