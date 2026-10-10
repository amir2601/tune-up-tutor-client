import React from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaMusic, FaStar } from 'react-icons/fa';
import { Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';
import CountUp from '../../../components/Shared/Animations/CountUp';

const stats = [
    { icon: <FaGraduationCap />, to: 10000, suffix: '+', label: 'Students enrolled', gradient: 'from-primary to-brand-400', ring: 'ring-primary/20' },
    { icon: <FaChalkboardTeacher />, to: 120, suffix: '+', label: 'Expert instructors', gradient: 'from-secondary to-pink-400', ring: 'ring-secondary/20' },
    { icon: <FaMusic />, to: 45, suffix: '+', label: 'Instruments taught', gradient: 'from-accent to-cyan-400', ring: 'ring-accent/20' },
    { icon: <FaStar />, to: 4.9, decimals: 1, suffix: '/5', label: 'Average rating', gradient: 'from-warning to-amber-400', ring: 'ring-warning/20' },
];

const Stats = () => {
    return (
        <Stagger className="grid grid-cols-1 gap-4 px-4 sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {stats.map(stat => (
                <StaggerItem
                    key={stat.label}
                    className="surface hover-lift group relative overflow-hidden bg-base-100 p-5"
                >
                    <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-xl transition-opacity duration-300 group-hover:opacity-25`} />
                    <div className="relative flex items-center gap-4">
                        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-xl text-white shadow-soft ring-4 ${stat.ring}`}>
                            {stat.icon}
                        </span>
                        <div>
                            <p className="text-2xl font-extrabold leading-none">
                                <CountUp to={stat.to} decimals={stat.decimals || 0} suffix={stat.suffix} />
                            </p>
                            <p className="mt-1 text-sm text-base-content/60">{stat.label}</p>
                        </div>
                    </div>
                </StaggerItem>
            ))}
        </Stagger>
    );
};

export default Stats;
