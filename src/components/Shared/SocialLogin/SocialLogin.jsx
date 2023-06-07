import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

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
            })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <div className='text-center flex gap-4 justify-center'>
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-primary btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
                <button className="btn btn-circle btn-primary btn-outline">
                    <FaGithub></FaGithub>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;