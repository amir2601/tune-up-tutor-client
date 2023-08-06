import React, { useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(`${import.meta.env.VITE_SRIPE_PUBLIC_KEY}`);

const Payment = () => {
    const singleClass = useLoaderData()
    console.log(singleClass);

    return (
        <div className='w-full px-4 md:px-0 md:w-3/6 mx-auto'>
            <h2 className='text-3xl font-semibold text-center my-5'>Payment Page</h2>

            <div className="mockup-window border bg-base-300 p-5">
                <div className="flex justify-center px-4 py-4 font-semibold">Total Price: {singleClass.price}</div>
                <Elements stripe={stripePromise}>
                    <div className=''>
                        <CheckoutForm singleClass={singleClass}/>
                    </div>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;