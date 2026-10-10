import React from 'react';
import { motion } from 'framer-motion';

/** Compact metric tile for dashboard overview pages. */
const StatTile = ({ icon, label, value, tint = 'from-primary to-secondary' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="surface hover-lift flex items-center gap-4 bg-base-100 p-5"
    >
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tint} text-xl text-white shadow-soft`}>
            {icon}
        </span>
        <div>
            <p className="text-2xl font-extrabold leading-none">{value}</p>
            <p className="mt-1 text-sm text-base-content/60">{label}</p>
        </div>
    </motion.div>
);

export default StatTile;
