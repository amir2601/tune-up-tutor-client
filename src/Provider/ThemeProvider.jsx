import React, { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const LIGHT = 'tuneup';
const DARK = 'tuneup-dark';
const STORAGE_KEY = 'tuneup-theme';

/** Resolve the theme to start with: saved choice, else OS preference, else light. */
const resolveInitialTheme = () => {
    if (typeof window === 'undefined') return LIGHT;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === LIGHT || saved === DARK) return saved;
    } catch {
        /* ignore */
    }
    const prefersDark = window.matchMedia
        && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? DARK : LIGHT;
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(resolveInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme === DARK ? 'dark' : 'light';
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            /* ignore */
        }
    }, [theme]);

    const toggleTheme = () => setTheme(current => (current === DARK ? LIGHT : DARK));

    const value = {
        theme,
        isDark: theme === DARK,
        setTheme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
};

export default ThemeProvider;
