import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const StudentHome = () => {
    const {user} = useContext(AuthContext)

    return (
        <div>
            Hello Student
            <h2>Welcome {user.displayName}</h2>
        </div>
    );
};

export default StudentHome;