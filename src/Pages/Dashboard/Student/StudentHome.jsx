import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const StudentHome = () => {
    const {user} = useContext(AuthContext)

    return (
        <div>
            <h2 className='text-3xl font-bold text-center mt-[45vh]'>Welcome {user.displayName}</h2>
        </div>
    );
};

export default StudentHome;