import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const InstructorHome = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className='w-full h-1/2 my-auto'>
            <h2 className='text-3xl font-bold text-center text-blue-400'>{user.displayName}</h2>
            <div className='text-center md:w-1/2 mx-auto'>
                <img src="https://i.ibb.co/NFNjK4s/Hello.png" alt="" />
            </div>
        </div>
    );
};

export default InstructorHome;