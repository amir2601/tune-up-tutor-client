import React, { useContext, useState } from 'react';
import SignUpImg from '../../assets/signup.png'
import { Link } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../../components/Shared/SocialLogin/SocialLogin';
import Swal from 'sweetalert2';


const Register = () => {
    useTitle('Register');
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

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(name, photo)
                    .then(() => {
                        const saveUser = { name: name, email: email, role: 'student' }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    form.reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Sign Up Successfull',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/')
                                }
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
        <div>
            <div className="hero min-h-[80vh] bg-accent rounded-lg">
                <div className="hero-content flex-col lg:flex-row md:justify-evenly">
                    <div className="text-center lg:text-left md:w-1/2">
                        <img src={SignUpImg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 md:w-1/2">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold">Sign Up</h1>
                            <p className='text-red-500'>{error}</p>
                            <form onSubmit={handleSignUp}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" name='photo' placeholder="Photo Url" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" name='confirmPassword' placeholder="confirm password" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                                </div>
                                <label className="label">
                                    <p className='label-text-alt '>Allready have an account? <Link to='/login' className="link link-hover">Login</Link> </p>
                                </label>
                                <SocialLogin></SocialLogin>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;