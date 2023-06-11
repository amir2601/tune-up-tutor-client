import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const CheckoutForm = ({ price }) => {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        if (price) {
            fetch(`${import.meta.env.VITE_API_URL}create-payment-intent`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ price: price })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.clientSecret);
                    setClientSecret(data.clientSecret)
                })
        }
    }, [])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous',
                    },
                },
            })

        if (confirmError) {
            console.log(confirmError)
            setCardError(confirmError.message)
        }

        if (paymentIntent.status === 'succeeded') {
            // save payment information to the server
            const paymentInfo = {
                name: user?.displayName,
                email: user?.email ,
                transactionId: paymentIntent.id,
                date: new Date(),
            }

            fetch(`${import.meta.env.VITE_API_URL}booking-data`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(paymentInfo)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe} className='btn btn-sm  btn-accent btn-outline'>
                Pay
            </button>
            <br />
            {cardError && <p className='text-red-500 font-semibold'>{cardError}</p>}
        </form>
    );
};

export default CheckoutForm;