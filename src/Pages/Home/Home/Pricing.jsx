import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaStar, FaArrowRight } from 'react-icons/fa';
import { Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';

const plans = [
    {
        name: 'Beginner',
        tagline: 'Perfect for first-timers',
        monthly: 19,
        featured: false,
        features: [
            '4 live lessons / month',
            '1 instrument track',
            'Practice resources library',
            'Community access',
        ],
        cta: 'Start free',
        to: '/sign-up',
    },
    {
        name: 'Pro',
        tagline: 'Most popular choice',
        monthly: 39,
        featured: true,
        features: [
            '12 live lessons / month',
            'Unlimited instrument tracks',
            'Personalised learning path',
            'Progress reports & feedback',
            'Priority tutor matching',
        ],
        cta: 'Go Pro',
        to: '/classes',
    },
    {
        name: 'Maestro',
        tagline: 'For serious musicians',
        monthly: 79,
        featured: false,
        features: [
            'Unlimited live lessons',
            '1-on-1 masterclasses',
            'Performance & studio coaching',
            'Exam & audition prep',
            'Dedicated success manager',
        ],
        cta: 'Talk to us',
        to: '/instructors',
    },
];

const Pricing = () => {
    const [annual, setAnnual] = useState(true);

    const price = (m) => (annual ? Math.round(m * 0.8) : m);

    return (
        <section id="pricing" className="scroll-mt-24 px-4 md:px-0">
            <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
                <span className="eyebrow mx-auto">Flexible plans</span>
                <h2 className="section-heading">Simple, Transparent <span className="text-gradient">Pricing</span></h2>
                <p className="text-base-content/60">Learn at your own pace. Switch or cancel any time — no strings attached.</p>
            </div>

            {/* Billing toggle */}
            <div className="mb-12 flex items-center justify-center gap-4">
                <span className={`text-sm font-semibold ${!annual ? 'text-base-content' : 'text-base-content/50'}`}>Monthly</span>
                <button
                    type="button"
                    role="switch"
                    aria-checked={annual}
                    aria-label="Toggle annual billing"
                    onClick={() => setAnnual(a => !a)}
                    className={`relative h-8 w-16 rounded-full p-1 transition-colors duration-300 ${annual ? 'bg-primary' : 'bg-base-300'}`}
                >
                    <motion.span
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                        className={`block h-6 w-6 rounded-full bg-white shadow ${annual ? 'ml-8' : 'ml-0'}`}
                    />
                </button>
                <span className={`text-sm font-semibold ${annual ? 'text-base-content' : 'text-base-content/50'}`}>
                    Annual <span className="badge badge-success badge-sm ml-1 border-0 text-white">-20%</span>
                </span>
            </div>

            <Stagger className="grid gap-6 lg:grid-cols-3" stagger={0.12} amount={0.1}>
                {plans.map(plan => (
                    <StaggerItem
                        key={plan.name}
                        className={plan.featured ? 'lg:-mt-4' : ''}
                    >
                        <div
                            className={`relative flex h-full flex-col overflow-hidden rounded-4xl p-8 transition-all duration-300 hover-lift ${
                                plan.featured
                                    ? 'bg-gradient-to-br from-primary via-brand-600 to-secondary text-white shadow-glow-lg'
                                    : 'surface bg-base-100'
                            }`}
                        >
                            {plan.featured && (
                                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                                    <FaStar className="text-warning" /> Popular
                                </span>
                            )}

                            <h3 className={`text-lg font-extrabold uppercase tracking-wider ${plan.featured ? 'text-white' : 'text-primary'}`}>
                                {plan.name}
                            </h3>
                            <p className={`mt-1 text-sm ${plan.featured ? 'text-white/70' : 'text-base-content/60'}`}>{plan.tagline}</p>

                            <div className="mt-6 flex items-end gap-1">
                                <span className="text-5xl font-extrabold tracking-tight">${price(plan.monthly)}</span>
                                <span className={`pb-1.5 text-sm ${plan.featured ? 'text-white/70' : 'text-base-content/50'}`}>/month</span>
                            </div>
                            {annual && (
                                <p className={`mt-1 text-xs ${plan.featured ? 'text-white/60' : 'text-base-content/50'}`}>
                                    billed annually · save 20%
                                </p>
                            )}

                            <ul className="mt-7 flex-1 space-y-3">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${plan.featured ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                                            <FaCheck className="text-[10px]" />
                                        </span>
                                        <span className={plan.featured ? 'text-white/90' : 'text-base-content/75'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={plan.to}
                                className={`btn mt-8 w-full rounded-full ${
                                    plan.featured
                                        ? 'border-0 bg-white text-primary hover:bg-white/90'
                                        : 'btn-primary'
                                }`}
                            >
                                {plan.cta} <FaArrowRight className="text-xs" />
                            </Link>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
};

export default Pricing;
