import React from 'react';
import { Link } from 'react-router-dom';
import { FaCommentDots, FaPen } from 'react-icons/fa';
import { alertDialog } from '../../../lib/feedback';

const statusStyles = {
    approved: 'badge-success',
    deny: 'badge-error',
    pending: 'badge-warning',
};

const MyClassesCard = ({ singleClass, index }) => {

    const handleFeedback = () => {
        alertDialog({
            type: 'info',
            title: 'Admin Feedback',
            text: singleClass.feedback || 'No feedback has been provided yet.',
            confirmText: 'Got it',
        });
    }

    return (
        <tr className='hover'>
            <td className='font-semibold text-base-content/50'>
                {index + 1}
            </td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12 ring-2 ring-base-300">
                        <img src={singleClass.img} alt={singleClass.className} />
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold capitalize">{singleClass.className}</div>
            </td>
            <td className='text-base-content/70'>
                {singleClass.name}
            </td>
            <td className='text-end font-semibold'>${singleClass.price}</td>
            <td>
                <span className={`badge badge-outline font-semibold capitalize ${statusStyles[singleClass.status] || 'badge-ghost'}`}>
                    {singleClass.status}
                </span>
            </td>
            <td className='text-center'>{singleClass.students}</td>
            <td>
                <button
                    onClick={handleFeedback}
                    className={singleClass.status === 'deny' ? "btn btn-outline btn-xs gap-1 rounded-full" : 'hidden'}
                >
                    <FaCommentDots /> See Feedback
                </button>
            </td>
            <td>
                <Link to={`/dashboard/update-class/${singleClass._id}`} className="btn btn-primary btn-xs gap-1 rounded-full">
                    <FaPen /> Update
                </Link>
            </td>
        </tr>
    );
};

export default MyClassesCard;
