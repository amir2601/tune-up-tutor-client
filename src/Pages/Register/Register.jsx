import React, { useContext, useState } from 'react';
import SignUpImg from '../../assets/Signup.png'
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../components/Shared/SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { FaMusic, FaCheckCircle } from 'react-icons/fa';


const Register = () => {
    useTitle('Register');
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            return setError('Password Did not match')
        }

        if (password.length < 6) {
            return setError('Password should be at least 6 characters long');
        }

        if (!/[A-Z]/.test(password)) {
            return setError('Password should contain at least one capital letter');
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return setError('Password should contain at least one special character');
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                console.log(result);

                updateUserProfile(name, photo)
                    .then(() => {
                        const saveUser = { name: name, email: email, role: 'student', img: photo }

                        form.reset();
                        navigate('/')
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Sign Up Successfull',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        fetch(`${import.meta.env.VITE_API_URL}users`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            })
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                setError('')
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })
    }

    return (
        <div className='mx-auto my-6 grid max-w-6xl overflow-hidden rounded-4xl bg-base-100 shadow-glow lg:grid-cols-2'>
            {/* Form panel */}
            <div className='order-2 p-6 sm:p-10 lg:order-1'>
                <div className='mx-auto max-w-md space-y-6'>
                    <div className='space-y-1 text-center lg:text-left'>
                        <div className='mb-4 flex items-center justify-center gap-2.5 lg:hidden'>
                            <span className='grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white'>
                                <FaMusic className='text-lg' />
                            </span>
                            <span className='text-lg font-extrabold tracking-tight'>Tune<span className='text-primary'>Up</span></span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Sign Up</h1>
                        <p className='text-sm text-base-content/60'>Create your free account and start learning today.</p>
                    </div>

                    {
                        error && <div className='alert alert-error rounded-2xl py-3 text-sm'>{error}</div>
                    }

                    <form onSubmit={handleSignUp} className='space-y-4'>
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your name" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="you@example.com" className="input input-bordered w-full" required />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input type="text" name='photo' placeholder="https://..." className="input input-bordered w-full" />
                        </div>

                        <div className='grid gap-4 sm:grid-cols-2'>
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered w-full" required />
                            </div>

                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-semibold">Confirm Password</span>
                                </label>
                                <input type="password" name='confirmPassword' placeholder="confirm password" className="input input-bordered w-full" required />
                            </div>
                        </div>

                        <button className="btn btn-primary w-full rounded-full shadow-soft" type="submit">Sign Up</button>

                        <p className='text-center text-sm text-base-content/60'>
                            Already have an account? <Link to='/login' className="link link-primary font-semibold no-underline hover:underline">Login</Link>
                        </p>
                    </form>

                    <SocialLogin></SocialLogin>
                </div>
            </div>

            {/* Brand panel */}
            <div className='relative order-1 hidden flex-col justify-between bg-gradient-to-br from-secondary via-brand-600 to-primary p-10 text-white lg:order-2 lg:flex'>
                <div className='relative z-10 flex items-center gap-2.5'>
                    <span className='grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur'>
                        <FaMusic className='text-lg' />
                    </span>
                    <span className='text-lg font-extrabold tracking-tight'>Tune<span className='text-white/80'>Up</span></span>
                </div>

                <div className='relative z-10 space-y-5'>
                    <h2 className='text-3xl font-extrabold leading-tight'>Start your journey to musical mastery</h2>
                    <p className='text-white/75'>Join thousands of students learning with the best instructors.</p>
                    <ul className='space-y-3 text-sm text-white/85'>
                        <li className='flex items-center gap-3'><FaCheckCircle /> Free to create an account</li>
                        <li className='flex items-center gap-3'><FaCheckCircle /> Personalised learning path</li>
                        <li className='flex items-center gap-3'><FaCheckCircle /> Secure checkout &amp; support</li>
                    </ul>
                </div>

                <img className='relative z-10 mx-auto w-64 drop-shadow-2xl animate-float' src={SignUpImg} alt="" />
                <div className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl' />
                <div className='pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-accent/30 blur-2xl' />
            </div>
        </div>
    );
};

export default Register;
