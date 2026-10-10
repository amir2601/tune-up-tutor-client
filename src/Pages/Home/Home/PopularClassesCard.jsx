import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaUserTie, FaArrowRight, FaChair } from 'react-icons/fa';

const PopularClassesCard = ({ popularClass }) => {
    const lowSeats = popularClass.seats > 0 && popularClass.seats <= 5;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link to="/classes" className="group surface hover-lift card-shine relative block overflow-hidden bg-base-100">
                <figure className="relative h-52 overflow-hidden">
                    <img
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={popularClass.img}
                        alt={popularClass.className}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                    <span className="badge absolute right-3 top-3 border-0 bg-primary/95 font-semibold text-primary-content shadow-soft">
                        ${popularClass.price}
                    </span>
                    <span className="badge absolute left-3 top-3 gap-1 border-0 bg-white/90 text-neutral backdrop-blur">
                        <FaStar className="text-warning" /> 4.9
                    </span>

                    <span className="absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        View details <FaArrowRight className="text-[10px]" />
                    </span>
                </figure>

                <div className="space-y-3 p-5">
                    <h3 className="text-lg font-bold capitalize leading-snug transition-colors group-hover:text-primary">
                        {popularClass.className}
                    </h3>
                    <p className="flex items-center gap-2 text-sm text-base-content/60">
                        <FaUserTie className="text-secondary" /> {popularClass.name}
                    </p>
                    <div className="flex items-center justify-between border-t border-base-300/70 pt-3 text-sm">
                        <span className="flex items-center gap-2 text-base-content/60">
                            <FaUsers className="text-accent" /> {popularClass.students} students
                        </span>
                        <span className={`inline-flex items-center gap-1.5 font-semibold ${lowSeats ? 'text-warning' : 'text-success'}`}>
                            <FaChair className="text-xs" /> {popularClass.seats} left
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default PopularClassesCard;
