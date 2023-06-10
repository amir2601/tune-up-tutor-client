import React from 'react';
import { Link } from 'react-router-dom';

const ManageUsersCard = ({ user, index, setReload }) => {

    const handleUpdateRole = (role, id) => {
        const updateRole = {role}
        console.log(updateRole);

        fetch(`${import.meta.env.VITE_API_URL}users/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateRole)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setReload(prevReload => !prevReload);
            })
    }

    return (
        <tr>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={user.img} />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <h3 className='font-semibold'>{user.name}</h3>
                <span>{user.email}</span>
            </td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => handleUpdateRole('admin', user._id)} disabled={user?.role === 'admin' || user?.role === 'instructor'} className="btn btn-outline btn-success btn-xs">Make Admin</button>
            </td>
            <td>
                <button onClick={() => handleUpdateRole('instructor', user._id)} disabled={user?.role === 'instructor' || user?.role === 'admin'} className="btn btn-outline btn-error btn-xs">Make Instructor</button>
            </td>
        </tr>
    );
};

export default ManageUsersCard;