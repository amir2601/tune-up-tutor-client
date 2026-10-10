import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animated number that counts up when scrolled into view.
 */
const CountUp = ({
    to = 0,
    from = 0,
    duration = 2,
    decimals = 0,
    prefix = '',
    suffix = '',
    separator = ',',
    className = '',
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const [value, setValue] = useState(from);

    useEffect(() => {
        if (!inView) return;

        let raf;
        const start = performance.now();
        const total = Math.max(duration * 1000, 1);

        const tick = (now) => {
            const progress = Math.min((now - start) / total, 1);
            // easeOutExpo for a snappy, premium settle
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setValue(from + (to - from) * eased);
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, to, from, duration]);

    const formatted = value
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
};

export default CountUp;
