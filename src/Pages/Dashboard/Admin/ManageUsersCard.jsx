import React from 'react';
import { FaUserShield, FaChalkboardTeacher } from 'react-icons/fa';

const roleStyles = {
    admin: 'badge-primary',
    instructor: 'badge-secondary',
    student: 'badge-accent',
};

const ManageUsersCard = ({ user, index, setReload }) => {

    const handleUpdateRole = (role, id) => {
        const updateRole = { role }

        fetch(`${import.meta.env.VITE_API_URL}users/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateRole)
        })
            .then(res => res.json())
            .then(data => {
                setReload(prevReload => !prevReload);
            })
    }

    return (
        <tr className='hover'>
            <td className='font-semibold text-base-content/50'>
                {index + 1}
            </td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12 ring-2 ring-base-300">
                        <img src={user.img} alt={user.name} />
                    </div>
                </div>
            </td>
            <td>
                <p className='font-semibold'>{user.name}</p>
                <span className='text-xs text-base-content/60'>{user.email}</span>
            </td>
            <td>
                <span className={`badge badge-outline font-semibold capitalize ${roleStyles[user.role] || 'badge-ghost'}`}>
                    {user.role}
                </span>
            </td>
            <td>
                <button onClick={() => handleUpdateRole('admin', user._id)} disabled={user?.role === 'admin' || user?.role === 'instructor'} className="btn btn-success btn-xs gap-1 rounded-full text-white">
                    <FaUserShield /> Make Admin
                </button>
            </td>
            <td>
                <button onClick={() => handleUpdateRole('instructor', user._id)} disabled={user?.role === 'instructor' || user?.role === 'admin'} className="btn btn-secondary btn-xs gap-1 rounded-full text-white">
                    <FaChalkboardTeacher /> Make Instructor
                </button>
            </td>
        </tr>
    );
};

export default ManageUsersCard;
