import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { alertDialog } from '../../../lib/feedback';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);

                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: 'student', img: loggedInUser.photoURL }

                fetch(`${import.meta.env.VITE_API_URL}users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => {
                console.log(error.message);

                const friendly = {
                    'auth/popup-closed-by-user': 'The sign-in window was closed before finishing.',
                    'auth/popup-blocked': 'Your browser blocked the sign-in popup. Please allow popups and try again.',
                    'auth/unauthorized-domain': 'This domain is not authorised for Google sign-in yet.',
                    'auth/operation-not-allowed': 'Google sign-in is not enabled for this project.',
                    'auth/configuration-not-found': 'Google sign-in is not configured for this project.',
                    'auth/cancelled-popup-request': 'Only one sign-in popup can be open at a time.',
                };

                const isDeletedClient = /deleted_client|deleted client/i.test(error.message);
                const text = isDeletedClient
                    ? 'The Google OAuth client for this app was deleted. Please recreate it in the Firebase / Google Cloud console.'
                    : friendly[error.code] || error.message;

                alertDialog({
                    type: 'error',
                    title: 'Google sign-in failed',
                    text,
                    confirmText: 'Got it',
                });
            })
    }

    return (
        <div className='space-y-4'>
            <div className="divider text-xs uppercase tracking-widest text-base-content/40">Or continue with</div>
            <div className='flex justify-center'>
                <button
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full gap-3 rounded-full border-base-300 normal-case hover:border-primary hover:bg-primary hover:text-primary-content"
                >
                    <FaGoogle className="text-error" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
