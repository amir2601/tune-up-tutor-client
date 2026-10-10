import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMusic, FaFacebookF, FaInstagram, FaLinkedinIn, FaStar } from 'react-icons/fa';

const InstructorCard = ({ instructor }) => {
    const avatar = instructor.img
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name || 'Instructor')}&background=7c3aed&color=fff`;

    const socials = [
        { icon: <FaFacebookF />, hover: 'hover:bg-primary' },
        { icon: <FaInstagram />, hover: 'hover:bg-secondary' },
        { icon: <FaLinkedinIn />, hover: 'hover:bg-primary' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group surface hover-lift card-shine overflow-hidden bg-base-100"
        >
            <div className="relative h-56 overflow-hidden bg-base-300">
                <img
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={avatar}
                    alt={instructor.name}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral/85 via-neutral/10 to-transparent" />
                <span className="badge absolute left-3 top-3 gap-1 border-0 bg-white/90 text-neutral backdrop-blur">
                    <FaMusic className="text-primary" /> Instructor
                </span>
                <span className="badge absolute right-3 top-3 gap-1 border-0 bg-white/90 text-neutral backdrop-blur">
                    <FaStar className="text-warning" /> 5.0
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="text-lg font-bold text-white">{instructor.name}</h2>
                    <p className="text-sm text-white/70">Professional Music Teacher</p>
                </div>
            </div>

            <div className="card-body gap-4">
                <p className="flex items-center gap-2 text-sm text-base-content/60">
                    <FaEnvelope className="text-primary" />
                    <span className="truncate">{instructor.email}</span>
                </p>

                <div className="flex items-center justify-between border-t border-base-300/70 pt-4">
                    <div className="flex gap-2">
                        {socials.map((s, i) => (
                            <span
                                key={i}
                                className={`grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-base-200 text-sm text-base-content/60 transition ${s.hover} hover:text-white`}
                            >
                                {s.icon}
                            </span>
                        ))}
                    </div>
                    <Link to="/classes" className="btn btn-outline btn-primary btn-sm rounded-full">View Classes</Link>
                </div>
            </div>
        </motion.div>
    );
};

export default InstructorCard;
