import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import PopularInstructorCard from './PopularInstructorCard';
import { Reveal } from '../../../components/Shared/Animations/Reveal';

const Skeleton = () => (
    <div className="surface overflow-hidden bg-base-100">
        <div className="h-56 w-full animate-pulse bg-base-300" />
        <div className="flex items-center justify-between p-5">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-base-300" />
            <div className="h-4 w-16 animate-pulse rounded-full bg-base-300" />
        </div>
    </div>
);

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}popular-instructors`)
            .then(res => res.json())
            .then(data => setInstructors(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div className="max-w-2xl space-y-3">
                    <span className="eyebrow">The Maestros</span>
                    <h2 className="section-heading">Top <span className="text-gradient">Instructors</span></h2>
                    <p className="text-base-content/60">Learn directly from seasoned performers and certified teachers.</p>
                </div>
                <Link to="/instructors" className="btn btn-ghost rounded-full text-primary hover:bg-primary/10">
                    View all <FaArrowRight className="text-xs" />
                </Link>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading
                    ? [0, 1, 2].map(i => <Skeleton key={i} />)
                    : instructors.map(instructor => (
                        <PopularInstructorCard key={instructor._id} instructor={instructor} />
                    ))}
            </div>
        </section>
    );
};

export default PopularInstructor;
