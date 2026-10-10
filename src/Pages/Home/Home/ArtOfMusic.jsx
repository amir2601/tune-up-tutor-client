import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlay } from 'react-icons/fa';
import { Reveal, Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';
import CountUp from '../../../components/Shared/Animations/CountUp';

const points = [
    'Personalised lesson plans for every skill level',
    'Live 1-on-1 sessions with certified musicians',
    'Flexible scheduling that fits your routine',
    'Track your progress with detailed feedback',
];

const ArtOfMusic = () => {
    return (
        <section className="grid items-center gap-12 px-4 md:px-0 lg:grid-cols-2">
            <Reveal direction="left" className="space-y-6">
                <span className="eyebrow">Why TuneUp</span>
                <h2 className="section-heading">The Art of <span className="text-gradient">Music</span></h2>
                <p className="leading-relaxed text-base-content/70">
                    Music is the universal language that transcends barriers and connects hearts — a profound
                    manifestation of human creativity. The art of music weaves rhythm, melody and harmony into a
                    tapestry of emotion that captivates listeners and leaves an indelible mark on the soul.
                </p>

                <Stagger className="space-y-3" stagger={0.1}>
                    {points.map(point => (
                        <StaggerItem key={point} className="flex items-start gap-3 text-base-content/80">
                            <FaCheckCircle className="mt-1 shrink-0 text-success" />
                            <span>{point}</span>
                        </StaggerItem>
                    ))}
                </Stagger>
            </Reveal>

            <Reveal direction="right" className="grid grid-cols-2 gap-4">
                <div className="group relative overflow-hidden rounded-3xl shadow-card">
                    <img
                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-80"
                        src="https://i.ibb.co/9Y7JxHG/about2.jpg"
                        alt="Musician"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral/50 to-transparent" />
                </div>
                <div className="grid gap-4 pt-8">
                    <div className="group relative overflow-hidden rounded-3xl shadow-card">
                        <img
                            className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-48"
                            src="https://i.ibb.co/FH6qfXL/about1.jpg"
                            alt="Instruments"
                            loading="lazy"
                        />
                    </div>
                    <div className="surface flex flex-col justify-center bg-gradient-to-br from-primary to-secondary p-5 text-white">
                        <p className="text-3xl font-extrabold">
                            <CountUp to={15} suffix="+" />
                        </p>
                        <p className="text-sm text-white/80">Years of experience</p>
                    </div>
                </div>

                {/* Floating play badge */}
                <motion.div
                    className="col-span-2 hidden items-center gap-3 rounded-3xl border border-base-300/70 bg-base-100/90 p-4 shadow-glow backdrop-blur sm:flex"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-white">
                        <span className="absolute inset-0 rounded-full bg-primary/50 animate-pulse-ring" />
                        <FaPlay className="ml-0.5 text-sm" />
                    </span>
                    <div>
                        <p className="font-bold">Try a free intro lesson</p>
                        <p className="text-sm text-base-content/60">No commitment — discover your sound today.</p>
                    </div>
                </motion.div>
            </Reveal>
        </section>
    );
};

export default ArtOfMusic;
