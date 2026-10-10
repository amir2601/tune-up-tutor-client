import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import PopularClassesCard from './PopularClassesCard';
import { Reveal } from '../../../components/Shared/Animations/Reveal';

const Skeleton = () => (
    <div className="surface overflow-hidden bg-base-100">
        <div className="h-52 w-full animate-pulse bg-base-300" />
        <div className="space-y-3 p-5">
            <div className="h-5 w-2/3 animate-pulse rounded-full bg-base-300" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-base-300" />
            <div className="h-4 w-full animate-pulse rounded-full bg-base-300" />
        </div>
    </div>
);

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}popular-classes`)
            .then(res => res.json())
            .then(data => {
                const approved = data.filter(item => item.status === 'approved');
                setPopularClasses(approved);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="px-4 md:px-0">
            <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div className="max-w-2xl space-y-3">
                    <span className="eyebrow">Top Rated</span>
                    <h2 className="section-heading">Popular <span className="text-gradient">Classes</span></h2>
                    <p className="text-base-content/60">Handpicked lessons loved by our community — start learning from the very best.</p>
                </div>
                <Link to="/classes" className="btn btn-ghost rounded-full text-primary hover:bg-primary/10">
                    View all <FaArrowRight className="text-xs" />
                </Link>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading
                    ? [0, 1, 2].map(i => <Skeleton key={i} />)
                    : popularClasses.map(popularClass => (
                        <PopularClassesCard key={popularClass._id} popularClass={popularClass} />
                    ))}
            </div>
        </section>
    );
};

export default PopularClasses;
