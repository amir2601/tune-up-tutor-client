import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaUserTie, FaEnvelope, FaChair, FaCheck } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClassesCard = ({ singleClass }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selecting, setSelecting] = useState(false);
    const userRole = localStorage.getItem('user-role');
    const isFull = singleClass.seats === 0;
    const isDisabled = isFull || userRole === 'admin' || userRole === 'instructor';
    const seatsPct = Math.min(100, Math.round((singleClass.seats / 20) * 100));

    const handleSelectClass = (selClass) => {
        const selectClass = { ...selClass, studentEmail: user?.email, mainClassId: singleClass._id };
        if (!user) {
            return navigate('/login');
        }
        setSelecting(true);
        fetch(`${import.meta.env.VITE_API_URL}select-class`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(selectClass),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Successfully Added',
                        text: 'Find it in your dashboard under Selected Classes.',
                        showConfirmButton: false,
                        timer: 1800,
                    });
                }
            })
            .catch(error => console.log(error))
            .finally(() => setSelecting(false));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={isFull ? 'card surface card-shine overflow-hidden bg-base-100 ring-1 ring-error/30' : 'card surface hover-lift card-shine overflow-hidden bg-base-100'}
        >
            <figure className="relative h-52 overflow-hidden">
                <img
                    className={`h-full w-full object-cover transition-transform duration-700 ${isFull ? 'grayscale' : 'group-hover:scale-110'}`}
                    src={singleClass.img}
                    alt={singleClass.className}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral/55 via-transparent to-transparent" />
                <span className={`badge absolute right-3 top-3 border-0 font-semibold shadow-soft ${isFull ? 'bg-error text-error-content' : 'bg-primary text-primary-content'}`}>
                    {isFull ? 'Sold Out' : `$${singleClass.price}`}
                </span>
                <span className="badge absolute left-3 top-3 gap-1 border-0 bg-white/90 text-neutral backdrop-blur">
                    <FaStar className="text-warning" /> 4.9
                </span>
            </figure>

            <div className="card-body gap-3">
                <div className="flex items-start justify-between gap-3">
                    <h2 className="card-title capitalize leading-snug">{singleClass.className}</h2>
                    {isFull ? (
                        <span className="badge badge-error badge-outline shrink-0">Full</span>
                    ) : (
                        <span className="badge badge-success badge-outline shrink-0">{singleClass.seats} left</span>
                    )}
                </div>

                <div className="space-y-2 text-sm text-base-content/70">
                    <p className="flex items-center gap-2">
                        <FaUserTie className="text-secondary" />
                        <span className="font-semibold text-base-content">{singleClass.name}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        <span className="truncate">{singleClass.email}</span>
                    </p>
                </div>

                {/* Seats availability meter */}
                <div className="space-y-1.5 pt-1">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-300">
                        <motion.div
                            className={`h-full rounded-full ${isFull ? 'bg-error' : 'bg-gradient-to-r from-primary to-secondary'}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${seatsPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-base-300/70 pt-3 text-sm">
                    <span className="flex items-center gap-2 text-base-content/60">
                        <FaChair className="text-accent" /> Seats: {singleClass.seats}
                    </span>
                    <span className="flex items-center gap-2 text-base-content/60">
                        <FaUsers className="text-accent" /> {singleClass.students} enrolled
                    </span>
                </div>

                <div className="card-actions">
                    <button
                        onClick={() => handleSelectClass(singleClass)}
                        disabled={isDisabled || selecting}
                        className="btn btn-primary group/btn w-full rounded-full border-0 disabled:bg-base-300 disabled:text-base-content/40"
                    >
                        {selecting ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : isFull ? (
                            'Class Full'
                        ) : (
                            <>
                                Select Class
                                <FaCheck className="hidden text-xs group-hover/btn:inline" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ClassesCard;
