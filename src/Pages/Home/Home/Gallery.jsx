import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { Stagger, StaggerItem, Reveal } from '../../../components/Shared/Animations/Reveal';

const u = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const shots = [
    { id: 'photo-1511671782779-c97d3d27a1d4', title: 'Acoustic sessions', span: 'col-span-2 row-span-2' },
    { id: 'photo-1493225457124-a3eb161ffa5f', title: 'The keys', span: 'col-span-1 row-span-1' },
    { id: 'photo-1520523839897-bd0b52f945a0', title: 'Grand piano', span: 'col-span-1 row-span-1' },
    { id: 'photo-1465847899084-d164df4dedc6', title: 'Live stage', span: 'col-span-2 row-span-1' },
    { id: 'photo-1571330735066-03aaa9429d89', title: 'Strings', span: 'col-span-1 row-span-1' },
    { id: 'photo-1514320291840-2e0a9bf2a9ae', title: 'On the beat', span: 'col-span-1 row-span-1' },
    { id: 'photo-1470225620780-dba8ba36b745', title: 'Studio nights', span: 'col-span-1 row-span-1' },
    { id: 'photo-1598488035139-bdbb2231ce04', title: 'Rehearsal', span: 'col-span-1 row-span-1' },
];

const Gallery = () => {
    const [active, setActive] = useState(null);

    useEffect(() => {
        if (!active) return;
        const onKey = (e) => e.key === 'Escape' && setActive(null);
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [active]);

    return (
        <section id="gallery" className="scroll-mt-24 px-4 md:px-0">
            <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
                <span className="eyebrow mx-auto">Inside the academy</span>
                <h2 className="section-heading">The Tune Up Tutor <span className="text-gradient">Gallery</span></h2>
                <p className="text-base-content/60">A glimpse into our studios, stages and the moments that make music magic.</p>
            </div>

            <Stagger
                className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[180px] md:grid-cols-4"
                stagger={0.07}
            >
                {shots.map(shot => (
                    <StaggerItem
                        key={shot.id}
                        direction="none"
                        className={`group relative cursor-pointer overflow-hidden rounded-3xl ${shot.span}`}
                        onClick={() => setActive(shot)}
                    >
                        <img
                            src={u(shot.id, 900)}
                            alt={shot.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral/85 via-neutral/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                            <span className="translate-y-2 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                {shot.title}
                            </span>
                            <span className="grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <FaExpand className="text-xs" />
                            </span>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>

            <Reveal className="mt-12 flex justify-center">
                <a href="#pricing" className="btn btn-outline btn-primary rounded-full px-7">See pricing plans</a>
            </Reveal>

            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral/90 p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(null)}
                    >
                        <button
                            type="button"
                            aria-label="Close"
                            className="btn btn-circle btn-ghost absolute right-5 top-5 text-white"
                            onClick={() => setActive(null)}
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        <motion.figure
                            className="max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-3xl shadow-glow-lg"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.92, y: 10, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={u(active.id, 1500)} alt={active.title} className="max-h-[78vh] w-full object-cover" />
                            <figcaption className="bg-base-100 px-5 py-3 text-sm font-semibold">{active.title}</figcaption>
                        </motion.figure>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
