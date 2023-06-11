import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${import.meta.env.VITE_SRIPE_PUBLIC_KEY}`);

const Payment = () => {

    const price = localStorage.getItem('price')

    return (
        <div className='w-3/6 mx-auto'>
            <h2 className='text-3xl font-semibold text-center my-5'>Payment Page</h2>

            <div className="mockup-window border bg-base-300 p-5">
                <div className="flex justify-center px-4 py-4 font-semibold">Total Price: $ {price}</div>
                <Elements stripe={stripePromise}>
                    <div className=''>
                        <CheckoutForm price={price}/>
                    </div>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;