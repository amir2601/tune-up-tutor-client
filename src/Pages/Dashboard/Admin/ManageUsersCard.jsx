import React from 'react';
import { Link } from 'react-router-dom';

const ManageUsersCard = ({user, index}) => {

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
                <button disabled={user?.role === 'admin'} className="btn btn-outline btn-success btn-xs">Make Admin</button>
            </td>
            <td>
                <button disabled={user?.role === 'instructor'} className="btn btn-outline btn-error btn-xs">Make Instructor</button>
            </td>
        </tr>
    );
};

export default ManageUsersCard;