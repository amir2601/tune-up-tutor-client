import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import ClassesCard from './ClassesCard';
import useTitle from '../../Hooks/useTitle';
import { Reveal } from '../../components/Shared/Animations/Reveal';

const Skeleton = () => (
    <div className="surface overflow-hidden bg-base-100">
        <div className="h-52 w-full animate-pulse bg-base-300" />
        <div className="card-body gap-3">
            <div className="h-6 w-2/3 animate-pulse rounded-full bg-base-300" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-base-300" />
            <div className="h-4 w-full animate-pulse rounded-full bg-base-300" />
            <div className="h-10 w-full animate-pulse rounded-full bg-base-300" />
        </div>
    </div>
);

const Classes = () => {
    useTitle('Classes');
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}classes`)
            .then(res => res.json())
            .then(data => {
                const approved = data.filter(item => item.status === 'approved');
                setClasses(approved);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return classes;
        return classes.filter(c =>
            `${c.className} ${c.name} ${c.email}`.toLowerCase().includes(q)
        );
    }, [classes, query]);

    return (
        <div className="mx-auto max-w-7xl">
            {/* Header band */}
            <section className="relative mx-4 mb-10 overflow-hidden rounded-4xl bg-gradient-to-br from-neutral via-slate-800 to-primary px-6 py-12 text-white sm:px-12 sm:py-16 md:mx-0">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-accent/25 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-2xl space-y-4 text-center">
                    <nav aria-label="Breadcrumb" className="breadcrumbs text-sm text-white/60">
                        <ul className="justify-center">
                            <li><Link to="/" className="transition hover:text-white">Home</Link></li>
                            <li className="font-semibold text-white" aria-current="page">Classes</li>
                        </ul>
                    </nav>
                    <span className="eyebrow mx-auto border-white/20 bg-white/10 text-white">Explore the catalog</span>
                    <h1 className="text-3xl font-extrabold sm:text-5xl">Browse Our <span className="bg-gradient-to-r from-brand-300 via-secondary to-accent bg-clip-text text-transparent">Classes</span></h1>
                    <p className="mx-auto max-w-xl text-white/75">
                        Find the perfect course for your level and reserve your seat with a single click.
                    </p>
                </div>
            </section>

            {/* Search + count */}
            <Reveal className="mb-8 flex flex-col items-center justify-between gap-4 px-4 sm:flex-row md:px-0">
                <label className="input input-bordered flex w-full items-center gap-3 rounded-full bg-base-100 sm:max-w-md">
                    <FaSearch className="text-base-content/40" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search classes or instructors…"
                        className="grow bg-transparent"
                    />
                    {query && (
                        <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-base-content/40 hover:text-primary">
                            <FaTimes />
                        </button>
                    )}
                </label>
                <p className="text-sm text-base-content/60">
                    {loading ? 'Loading classes…' : <><span className="font-bold text-base-content">{filtered.length}</span> classes available</>}
                </p>
            </Reveal>

            <div className="grid gap-6 px-4 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
                {loading ? (
                    [0, 1, 2, 3, 4, 5].map(i => <Skeleton key={i} />)
                ) : filtered.length ? (
                    filtered.map(singleClass => (
                        <ClassesCard key={singleClass._id} singleClass={singleClass} />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center gap-3 py-20 text-center">
                        <span className="text-5xl">🎸</span>
                        <p className="text-lg font-bold">No classes match "{query}"</p>
                        <button type="button" onClick={() => setQuery('')} className="btn btn-primary btn-sm rounded-full">Clear search</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Classes;
