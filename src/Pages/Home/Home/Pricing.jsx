import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaUsers, FaUserTie, FaChair, FaArrowRight } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from '../../../lib/feedback';
import { Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';

const Skeleton = () => (
    <div className="surface overflow-hidden bg-base-100">
        <div className="h-52 w-full animate-pulse bg-base-300" />
        <div className="card-body gap-3">
            <div className="h-6 w-2/3 animate-pulse rounded-full bg-base-300" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-base-300" />
            <div className="h-10 w-full animate-pulse rounded-full bg-base-300" />
        </div>
    </div>
);

const Pricing = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectingId, setSelectingId] = useState(null);
    const userRole = localStorage.getItem('user-role');

    // Real data: top enrolled, approved classes from the API.
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}popular-classes`)
            .then(res => res.json())
            .then(data => {
                const approved = (data || []).filter(c => c.status === 'approved');
                setCourses(approved.slice(0, 3));
            })
            .catch(() => setCourses([]))
            .finally(() => setLoading(false));
    }, []);

    // Adds the course to Selected Classes, then goes straight to the Stripe
    // checkout — enrolment only completes once the payment succeeds.
    const handleEnroll = (course) => {
        if (!user) {
            return navigate('/login');
        }

        const selectClass = { ...course, studentEmail: user.email, mainClassId: course._id };
        setSelectingId(course._id);

        fetch(`${import.meta.env.VITE_API_URL}select-class`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(selectClass),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast({
                        type: 'success',
                        title: 'Course added',
                        text: 'Complete the secure checkout to finish enrolling.',
                    });
                    navigate(`/dashboard/payment/${course._id}`);
                }
            })
            .catch(error => console.log(error))
            .finally(() => setSelectingId(null));
    };

    const renderCta = (course) => {
        const seats = Number(course.seats) || 0;
        const isFull = seats <= 0;
        const isStaff = userRole === 'admin' || userRole === 'instructor';

        if (isFull) {
            return (
                <button type="button" disabled className="btn btn-primary w-full rounded-full border-0 disabled:bg-base-300 disabled:text-base-content/40">
                    Class Full
                </button>
            );
        }

        if (isStaff) {
            return (
                <Link to="/classes" className="btn btn-primary w-full rounded-full border-0">
                    Browse catalog <FaArrowRight className="text-xs" />
                </Link>
            );
        }

        return (
            <button
                type="button"
                onClick={() => handleEnroll(course)}
                disabled={selectingId === course._id}
                className="btn btn-primary w-full rounded-full border-0 disabled:bg-base-300 disabled:text-base-content/40"
            >
                {selectingId === course._id ? (
                    <span className="loading loading-spinner loading-sm" />
                ) : (
                    <>
                        Pay & Enroll
                        <FaArrowRight className="text-xs" />
                    </>
                )}
            </button>
        );
    };

    return (
        <section id="pricing" className="scroll-mt-24 px-4 md:px-0">
            <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
                <span className="eyebrow mx-auto">Top courses</span>
                <h2 className="section-heading">Simple, Transparent <span className="text-gradient">Pricing</span></h2>
                <p className="text-base-content/60">
                    One flat price per course — no hidden fees. Reserve your seat and pay securely in seconds.
                </p>
            </div>

            {loading ? (
                <div className="grid gap-6 lg:grid-cols-3">
                    {[0, 1, 2].map(i => <Skeleton key={i} />)}
                </div>
            ) : courses.length ? (
                <Stagger className="grid gap-6 lg:grid-cols-3" stagger={0.12} amount={0.1}>
                    {courses.map((course, index) => {
                        const seats = Number(course.seats) || 0;
                        const isFull = seats <= 0;
                        const featured = index === 0;

                        return (
                            <StaggerItem key={course._id} className={featured ? 'lg:-mt-4' : ''}>
                                <div className={`relative flex h-full flex-col overflow-hidden rounded-4xl transition-all duration-300 hover-lift ${
                                    featured
                                        ? 'bg-gradient-to-br from-primary via-brand-600 to-secondary text-white shadow-glow-lg'
                                        : 'surface card-shine bg-base-100'
                                }`}>
                                    {featured && (
                                        <span className={`absolute right-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur ${
                                            featured ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                                        }`}>
                                            <FaStar className="text-warning" /> Most Popular
                                        </span>
                                    )}

                                    <figure className="relative h-44 overflow-hidden">
                                        <img
                                            className={`h-full w-full object-cover ${isFull ? 'grayscale' : ''}`}
                                            src={course.img}
                                            alt={course.className}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral/55 via-transparent to-transparent" />
                                    </figure>

                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className={`text-lg font-extrabold uppercase tracking-wider ${featured ? 'text-white' : 'text-primary'}`}>
                                            {course.className}
                                        </h3>
                                        <p className={`mt-1 flex items-center gap-2 text-sm ${featured ? 'text-white/70' : 'text-base-content/60'}`}>
                                            <FaUserTie className={featured ? 'text-white/70' : 'text-secondary'} />
                                            {course.name}
                                        </p>

                                        <div className="mt-5 flex items-end gap-1">
                                            <span className="text-5xl font-extrabold tracking-tight">${Number(course.price) || 0}</span>
                                            <span className={`pb-1.5 text-sm ${featured ? 'text-white/70' : 'text-base-content/50'}`}>
                                                / course
                                            </span>
                                        </div>
                                        {isFull && (
                                            <p className={`mt-1 text-xs font-semibold ${featured ? 'text-white/60' : 'text-error'}`}>
                                                Sold out — no seats left
                                            </p>
                                        )}

                                        <div className={`mt-6 flex items-center justify-between border-t pt-4 text-sm ${featured ? 'border-white/20' : 'border-base-300/70'}`}>
                                            <span className={`flex items-center gap-2 ${featured ? 'text-white/70' : 'text-base-content/60'}`}>
                                                <FaChair className="text-accent" /> {seats} seats left
                                            </span>
                                            <span className={`flex items-center gap-2 ${featured ? 'text-white/70' : 'text-base-content/60'}`}>
                                                <FaUsers className="text-accent" /> {Number(course.students) || 0} enrolled
                                            </span>
                                        </div>

                                        <div className="mt-6">
                                            {renderCta(course)}
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            ) : (
                <div className="mx-auto flex max-w-xl flex-col items-center gap-3 py-10 text-center">
                    <span className="text-5xl">🎸</span>
                    <p className="text-lg font-bold">No courses available right now</p>
                    <Link to="/classes" className="btn btn-primary btn-sm rounded-full">
                        Browse all classes
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Pricing;