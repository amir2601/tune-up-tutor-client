import React, { useEffect } from 'react';

const UserRoleCheck = ({user}) => {
    
    return (
        useEffect(() => {
            fetch(`${import.meta.env.VITE_API_URL}users/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setUserRole(data.role);
                    localStorage.setItem('user-role', data.role)
                })
        }, [])
    );
};

export default UserRoleCheck;