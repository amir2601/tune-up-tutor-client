import React from 'react';
import { FaMusic, FaUserTie, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Reveal, Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';
import { Link } from 'react-router-dom';

const steps = [
    {
        icon: <FaMusic />,
        title: 'Pick your instrument',
        text: 'Choose from guitar, piano, drums, violin, flute and dozens more — whatever speaks to you.',
        tint: 'from-primary to-brand-400',
    },
    {
        icon: <FaUserTie />,
        title: 'Match with a tutor',
        text: 'Get paired with a certified instructor who fits your level, goals and schedule.',
        tint: 'from-secondary to-pink-400',
    },
    {
        icon: <FaCalendarCheck />,
        title: 'Book & start playing',
        text: 'Reserve your seat, check out securely and begin your very first lesson with confidence.',
        tint: 'from-accent to-cyan-400',
    },
];

const HowItWorks = () => {
    return (
        <section className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
                <span className="eyebrow mx-auto">Simple &amp; fast</span>
                <h2 className="section-heading">How It <span className="text-gradient">Works</span></h2>
                <p className="text-base-content/60">From curious beginner to confident player in three effortless steps.</p>
            </div>

            <div className="relative">
                {/* connecting line */}
                <div className="pointer-events-none absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />

                <Stagger className="grid gap-8 lg:grid-cols-3" stagger={0.15}>
                    {steps.map((step, i) => (
                        <StaggerItem key={step.title} className="group relative">
                            <div className="surface hover-lift card-shine relative h-full bg-base-100 p-8 text-center">
                                <span className={`relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${step.tint} text-2xl text-white shadow-glow-sm`}>
                                    {step.icon}
                                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-base-100 text-xs font-extrabold text-primary shadow-card ring-1 ring-base-300">
                                        {i + 1}
                                    </span>
                                </span>
                                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-base-content/60">{step.text}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>

            <Reveal className="mt-12 flex justify-center" delay={0.1}>
                <Link to="/classes" className="btn btn-primary group rounded-full px-7 shadow-soft border-0">
                    Start learning today
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </Reveal>
        </section>
    );
};

export default HowItWorks;
