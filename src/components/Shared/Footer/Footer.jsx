import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaMusic, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');

    const socials = [
        { icon: <FaFacebookF />, href: 'https://www.facebook.com/riad.vai.2601', label: 'Facebook', hover: 'hover:from-[#1877f2] hover:to-[#0a58ca]' },
        { icon: <FaInstagram />, href: 'https://www.instagram.com/amir_hossin_.riad/', label: 'Instagram', hover: 'hover:from-[#f58529] hover:to-[#dd2a7b]' },
        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/amir-hossin-riad/', label: 'LinkedIn', hover: 'hover:from-[#0a66c2] hover:to-[#004182]' },
        { icon: <FaGithub />, href: 'https://github.com/amir2601', label: 'GitHub', hover: 'hover:from-slate-700 hover:to-slate-900' },
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "You're on the list!",
            text: 'Watch your inbox for fresh lessons and offers.',
            showConfirmButton: false,
            timer: 2000,
        });
        setEmail('');
    };

    return (
        <footer className="relative mt-16 overflow-hidden rounded-t-5xl bg-neutral text-neutral-content">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

            {/* Newsletter band */}
            <div className="relative border-b border-white/10">
                <div className="page-shell flex flex-col items-center justify-between gap-6 py-10 lg:flex-row">
                    <div className="max-w-xl text-center lg:text-left">
                        <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                            Join <span className="text-gradient">10,000+</span> music learners
                        </h3>
                        <p className="mt-2 text-sm text-neutral-content/70">
                            Get practice tips, new course drops and exclusive offers — straight to your inbox.
                        </p>
                    </div>
                    <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="input input-bordered w-full rounded-full border-white/15 bg-white/5 text-white placeholder:text-neutral-content/40 focus:border-primary"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn btn-primary rounded-full px-5 shadow-soft"
                            aria-label="Subscribe"
                        >
                            <FaPaperPlane />
                        </motion.button>
                    </form>
                </div>
            </div>

            <div className="page-shell relative grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2.5">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-soft">
                            <FaMusic className="text-lg" />
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-white">
                            Tune<span className="text-primary">Up</span>
                        </span>
                    </Link>
                    <p className="max-w-xs text-sm leading-relaxed text-neutral-content/70">
                        Providing the best music tutors since 2010. Learn guitar, piano, drums, violin, flute and more from world-class instructors.
                    </p>
                    <p className="flex items-center gap-2 text-sm text-neutral-content/70">
                        <FaMapMarkerAlt className="text-primary" /> Dhaka, Bangladesh
                    </p>
                </div>

                <div>
                    <h6 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-content/50">Explore</h6>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/" className="link-underline text-neutral-content/80 transition hover:text-primary">Home</Link></li>
                        <li><Link to="/classes" className="link-underline text-neutral-content/80 transition hover:text-primary">Classes</Link></li>
                        <li><Link to="/instructors" className="link-underline text-neutral-content/80 transition hover:text-primary">Instructors</Link></li>
                        <li><Link to="/sign-up" className="link-underline text-neutral-content/80 transition hover:text-primary">Become a Student</Link></li>
                    </ul>
                </div>

                <div>
                    <h6 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-content/50">Instruments</h6>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/classes" className="link-underline text-neutral-content/80 transition hover:text-primary">Guitar</Link></li>
                        <li><Link to="/classes" className="link-underline text-neutral-content/80 transition hover:text-primary">Piano</Link></li>
                        <li><Link to="/classes" className="link-underline text-neutral-content/80 transition hover:text-primary">Drums</Link></li>
                        <li><Link to="/classes" className="link-underline text-neutral-content/80 transition hover:text-primary">Violin &amp; Flute</Link></li>
                    </ul>
                </div>

                <div>
                    <h6 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-content/50">Social Links</h6>
                    <div className="flex gap-3">
                        {socials.map(social => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target='_blank'
                                rel="noreferrer"
                                aria-label={social.label}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.94 }}
                                className={`grid h-11 w-11 place-items-center rounded-2xl bg-white/5 text-lg text-neutral-content ring-1 ring-white/10 transition-all duration-300 hover:bg-gradient-to-br hover:text-white ${social.hover}`}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative border-t border-white/10">
                <div className="page-shell flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-neutral-content/60 sm:flex-row sm:text-left">
                    <p>Copyright © 2023 - All rights reserved by Tune Up Tutor</p>
                    <p className="flex items-center gap-1.5">
                        Crafted with a passion for music <FaMusic className="text-primary animate-wave" />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
