import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const AdminHome = () => {
    const {user} = useContext(AuthContext)

    return (
        <div>
            <h2 className='text-3xl font-bold text-center mt-[45vh] text-blue-400'>Welcome {user.displayName}</h2>
        </div>
    );
};

export default AdminHome;