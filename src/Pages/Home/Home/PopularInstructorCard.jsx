import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaStar } from 'react-icons/fa';

const PopularInstructorCard = ({ instructor }) => {
    const avatar = instructor.img
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name || 'Instructor')}&background=7c3aed&color=fff`;

    const socials = [
        { icon: <FaFacebookF />, hover: 'hover:bg-primary' },
        { icon: <FaInstagram />, hover: 'hover:bg-secondary' },
        { icon: <FaLinkedinIn />, hover: 'hover:bg-primary' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="group surface hover-lift card-shine overflow-hidden bg-base-100">
                <div className="relative h-56 overflow-hidden bg-base-300">
                    <img
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={avatar}
                        alt={instructor.name}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral/85 via-neutral/10 to-transparent" />
                    <span className="badge absolute left-3 top-3 gap-1 border-0 bg-white/90 text-neutral backdrop-blur">
                        <FaStar className="text-warning" /> 5.0
                    </span>

                    {/* Hover social reveal */}
                    <div className="absolute right-3 top-3 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        {socials.map((s, i) => (
                            <span
                                key={i}
                                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/20 text-xs text-white backdrop-blur transition ${s.hover}`}
                            >
                                {s.icon}
                            </span>
                        ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="text-lg font-bold text-white">{instructor.name}</h3>
                        <p className="text-sm text-white/70">Professional Instructor</p>
                    </div>
                </div>
                <div className="flex items-center justify-between p-5">
                    <span className="inline-flex items-center gap-2 text-sm text-base-content/60">
                        <FaEnvelope className="text-primary" />
                        <span className="max-w-[10rem] truncate">{instructor.email}</span>
                    </span>
                    <span className="badge badge-ghost border-0 bg-primary/10 font-semibold text-primary">Top rated</span>
                </div>
            </div>
        </motion.div>
    );
};

export default PopularInstructorCard;
