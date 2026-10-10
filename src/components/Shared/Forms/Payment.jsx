import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Link, useLoaderData } from 'react-router-dom';
import { FaUserTie, FaChair, FaLock } from 'react-icons/fa';

const stripePromise = loadStripe(`${import.meta.env.VITE_SRIPE_PUBLIC_KEY}`);

const Payment = () => {
    const singleClass = useLoaderData()

    // The selected class is removed from the database once it is paid for, so
    // revisiting this page (or opening a stale link) yields no data.
    if (!singleClass || !singleClass.className) {
        return (
            <div className='mx-auto w-full max-w-xl px-4 text-center'>
                <div className='surface space-y-4 bg-base-100 p-10'>
                    <span className='text-5xl'>✅</span>
                    <h2 className='text-2xl font-extrabold'>Nothing to pay for</h2>
                    <p className='text-sm text-base-content/60'>
                        This class is no longer awaiting payment — it may have already been paid for or removed.
                    </p>
                    <Link to='/dashboard/selected-classes' className='btn btn-primary rounded-full'>
                        Back to my selected classes
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='mx-auto w-full max-w-4xl px-4 md:px-0'>
            <header className='mb-6 space-y-1 text-center'>
                <span className='eyebrow mx-auto'>Secure Checkout</span>
                <h2 className='section-heading'>Payment Page</h2>
                <p className='text-sm text-base-content/60'>Complete your enrolment in just a few seconds.</p>
            </header>

            <div className='surface grid gap-6 bg-base-100 p-6 md:grid-cols-2'>
                {/* Summary */}
                <div className='space-y-4'>
                    <div className='overflow-hidden rounded-3xl'>
                        <img className='h-44 w-full object-cover' src={singleClass.img} alt={singleClass.className} />
                    </div>
                    <h3 className='text-lg font-bold capitalize'>{singleClass.className}</h3>
                    <div className='space-y-2 text-sm text-base-content/70'>
                        <p className='flex items-center gap-2'><FaUserTie className='text-secondary' /> {singleClass.name}</p>
                        <p className='flex items-center gap-2'><FaChair className='text-accent' /> {singleClass.seats} seats available</p>
                    </div>
                    <div className='flex items-center justify-between rounded-2xl bg-base-200 px-4 py-3'>
                        <span className='text-sm font-semibold text-base-content/60'>Total Price</span>
                        <span className='text-xl font-extrabold text-primary'>${singleClass.price}</span>
                    </div>
                </div>

                {/* Checkout */}
                <div className='space-y-4'>
                    <div className='flex items-center gap-2 text-sm font-semibold text-base-content/60'>
                        <FaLock className='text-success' /> Card details
                    </div>
                    <div className='rounded-3xl border border-base-300 bg-base-100 p-4'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm singleClass={singleClass} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
