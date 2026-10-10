import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import InstructorCard from './InstructorCard';
import useTitle from '../../Hooks/useTitle';
import { Reveal } from '../../components/Shared/Animations/Reveal';

const Skeleton = () => (
    <div className="surface overflow-hidden bg-base-100">
        <div className="h-56 w-full animate-pulse bg-base-300" />
        <div className="card-body gap-4">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-base-300" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-base-300" />
        </div>
    </div>
);

const Instructors = () => {
    useTitle('Instructors');
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}instructors`)
            .then(res => res.json())
            .then(data => setInstructors(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return instructors;
        return instructors.filter(i => `${i.name} ${i.email}`.toLowerCase().includes(q));
    }, [instructors, query]);

    return (
        <div className="mx-auto max-w-7xl">
            {/* Header band */}
            <section className="relative mx-4 sm:mx-6 lg:mx-8 mb-10 overflow-hidden rounded-4xl bg-gradient-to-br from-primary via-brand-600 to-secondary px-6 py-12 text-white sm:px-12 sm:py-16">
                <div className="pointer-events-none absolute inset-0 bg-dots opacity-20" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-accent/30 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-2xl space-y-4 text-center">
                    <nav aria-label="Breadcrumb" className="breadcrumbs text-sm text-white/60">
                        <ul className="justify-center">
                            <li><Link to="/" className="transition hover:text-white">Home</Link></li>
                            <li className="font-semibold text-white" aria-current="page">Instructors</li>
                        </ul>
                    </nav>
                    <span className="eyebrow mx-auto border-white/20 bg-white/10 text-white">Meet the team</span>
                    <h1 className="text-3xl font-extrabold sm:text-5xl">Our Expert <span className="text-white/90">Instructors</span></h1>
                    <p className="mx-auto max-w-xl text-white/75">
                        Passionate, certified and ready to help you hit every note with confidence.
                    </p>
                </div>
            </section>

            {/* Search + count */}
            <Reveal className="mb-8 flex flex-col items-center justify-between gap-4 px-4 sm:px-6 sm:flex-row lg:px-8">
                <label className="input input-bordered flex w-full items-center gap-3 rounded-full bg-base-100 sm:max-w-md">
                    <FaSearch className="text-base-content/40" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search instructors…"
                        className="grow bg-transparent"
                    />
                    {query && (
                        <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-base-content/40 hover:text-primary">
                            <FaTimes />
                        </button>
                    )}
                </label>
                <p className="text-sm text-base-content/60">
                    {loading ? 'Loading instructors…' : <><span className="font-bold text-base-content">{filtered.length}</span> instructors teaching</>}
                </p>
            </Reveal>

            <div className="grid gap-6 px-4 sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    [0, 1, 2, 3, 4, 5].map(i => <Skeleton key={i} />)
                ) : filtered.length ? (
                    filtered.map(instructor => (
                        <InstructorCard key={instructor._id} instructor={instructor} />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center gap-3 py-20 text-center">
                        <span className="text-5xl">🎼</span>
                        <p className="text-lg font-bold">No instructors match "{query}"</p>
                        <button type="button" onClick={() => setQuery('')} className="btn btn-primary btn-sm rounded-full">Clear search</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Instructors;
