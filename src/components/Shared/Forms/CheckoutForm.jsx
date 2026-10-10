import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const CheckoutForm = ({ singleClass }) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (!singleClass?.price) return;

        let active = true;
        fetch(`${import.meta.env.VITE_API_URL}create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price: singleClass.price })
        })
            .then(res => res.json())
            .then(data => {
                if (active) setClientSecret(data.clientSecret || '')
            })
            .catch(error => {
                if (active) setCardError('We could not start the payment. Please try again.')
                console.log(error)
            })

        return () => { active = false }
    }, [singleClass?.price])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            // Stripe.js has not loaded yet, or the payment intent is still being
            // created. Keep the button disabled until everything is ready.
            return;
        }

        // Get a reference to the mounted CardElement.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true)
        setCardError('')

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
            setCardError(confirmError.message)
            setProcessing(false)
            return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            // save payment information to the server
            const paymentInfo = {
                classId: singleClass._id,
                name: singleClass.className,
                studentName: user.displayName,
                email: user.email,
                price: singleClass.price,
                transactionId: paymentIntent.id,
                date: new Date(),
            };

            const enrolledClass = {
                classId: singleClass._id,
                mainClassId: singleClass.mainClassId,
                className: singleClass.className,
                img: singleClass.img,
                studentName: user.displayName,
                studentEmail: user.email,
                instructorName: singleClass.name,
                instructorEmail: singleClass.email,
                price: singleClass.price,
                seats: singleClass.seats,
                students: singleClass.students
            }

            fetch(`${import.meta.env.VITE_API_URL}booking-data`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ paymentInfo, enrolledClass })
            })
                .then(res => res.json())
                .then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Payment Successfully Done',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/dashboard/enrolled-classes')
                })
                .catch(error => {
                    console.log(error)
                    setCardError('Payment went through but we could not save your enrolment. Please contact support.')
                })
                .finally(() => setProcessing(false))
        } else {
            setCardError('Payment was not completed. Please try again.')
            setProcessing(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
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
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className='btn btn-primary w-full rounded-full gap-2 shadow-soft'
            >
                {processing
                    ? <span className='loading loading-spinner loading-sm' />
                    : <FaLock className='text-xs' />} Pay
            </button>
            {cardError && <p className='text-sm font-semibold text-red-500'>{cardError}</p>}
        </form>
    );
};

export default CheckoutForm;
