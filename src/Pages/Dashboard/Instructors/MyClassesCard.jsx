import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyClassesCard = ({ singleClass, index }) => {

    const handleFeedback = () => {
        Swal.fire('Admin Feedback', singleClass.feedback)
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
                            <img src={singleClass.img} />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{singleClass.className}</div>
            </td>
            <td>
                {singleClass.name}
            </td>
            <td className='text-end'>{singleClass.price}</td>
            <td>
                <div className="badge badge-accent badge-outline">{singleClass.status}</div>
            </td>
            <td className='text-center'>{singleClass.students}</td>
            <td>
                <Link onClick={handleFeedback} className={singleClass.status === 'deny' ? "btn btn-outline btn-xs" : 'hidden'}>See Feedback</Link>
            </td>
            <td>
                <Link className="btn btn-outline btn-xs">Update</Link>
            </td>
        </tr>
    );
};

export default MyClassesCard;