import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if (user) {
        return children;
    }

    // return <Navigate to="/login" replace ></Navigate>
    return <Navigate to="/login" state={{ from: location }} replace ></Navigate>
};

export default PrivateRoutes;