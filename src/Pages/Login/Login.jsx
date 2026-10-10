import React, { useContext, useState } from 'react';
import loginImg from '../../assets/login.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';
import SocialLogin from './../../components/Shared/SocialLogin/SocialLogin';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaRegEye, FaRegEyeSlash, FaMusic, FaCheckCircle } from 'react-icons/fa';

const Login = () => {
    useTitle('Login');
    const [error, setError] = useState('');
    const [hidePass, setHidePass] = useState(true)
    const { logIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('')
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })
    }

    return (
        <div className='mx-auto my-6 grid w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-4xl bg-base-100 shadow-glow sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] lg:grid-cols-2'>
            {/* Brand panel */}
            <div className='relative hidden flex-col justify-between bg-gradient-to-br from-primary via-brand-600 to-secondary p-10 text-white lg:flex'>
                <div className='relative z-10 flex items-center gap-2.5'>
                    <span className='grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur'>
                        <FaMusic className='text-lg' />
                    </span>
                    <span className='text-lg font-extrabold tracking-tight'>Tune Up <span className='text-white/80'>Tutor</span></span>
                </div>

                <div className='relative z-10 space-y-5'>
                    <h2 className='text-3xl font-extrabold leading-tight'>Welcome back to your musical journey</h2>
                    <p className='text-white/75'>Sign in to pick up right where you left off.</p>
                    <ul className='space-y-3 text-sm text-white/85'>
                        <li className='flex items-center gap-3'><FaCheckCircle /> Book classes with expert instructors</li>
                        <li className='flex items-center gap-3'><FaCheckCircle /> Track your payments &amp; progress</li>
                        <li className='flex items-center gap-3'><FaCheckCircle /> Learn at your own pace</li>
                    </ul>
                </div>

                <img className='relative z-10 mx-auto w-64 drop-shadow-2xl animate-float' src={loginImg} alt="" />
                <div className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl' />
                <div className='pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-accent/30 blur-2xl' />
            </div>

            {/* Form panel */}
            <div className='p-6 sm:p-10'>
                <div className='mx-auto max-w-md space-y-6'>
                    <div className='space-y-1 text-center lg:text-left'>
                        <div className='mb-4 flex items-center justify-center gap-2.5 lg:hidden'>
                            <span className='grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white'>
                                <FaMusic className='text-lg' />
                            </span>
                            <span className='text-lg font-extrabold tracking-tight'>Tune Up <span className='text-primary'>Tutor</span></span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Login</h1>
                        <p className='text-sm text-base-content/60'>Enter your credentials to access your account.</p>
                    </div>

                    {
                        error && <div className='alert alert-error rounded-2xl py-3 text-sm'>{error}</div>
                    }

                    <form onSubmit={handleLogin} className='space-y-4'>
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="you@example.com" className="input input-bordered w-full" required />
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <div className='join w-full'>
                                <input
                                    type={hidePass ? "password" : "text"}
                                    name='password'
                                    placeholder="password"
                                    className="input input-bordered join-item w-full"
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setHidePass(hidePass ? false : true)}
                                    className='btn btn-outline join-item border-base-300'
                                    aria-label='Toggle password visibility'
                                >
                                    {hidePass ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}
                                </button>
                            </div>
                        </div>

                        <button className="btn btn-primary w-full rounded-full shadow-soft" type="submit">Login</button>

                        <p className='text-center text-sm text-base-content/60'>
                            Don't have an account? <Link to='/sign-up' className="link link-primary font-semibold no-underline hover:underline">Register</Link>
                        </p>
                    </form>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
