import React from 'react';
import { FaCheck, FaTimes, FaCommentDots } from 'react-icons/fa';
import { promptDialog, toast } from '../../../lib/feedback';

const statusStyles = {
    approved: 'badge-success',
    deny: 'badge-error',
    pending: 'badge-warning',
};

const ManageClassesCard = ({ singleClass, index, setReload }) => {

    const handleUpdateStatus = (status, id) => {
        const updateStatus = { status: status }

        fetch(`${import.meta.env.VITE_API_URL}classes/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(data => {
                setReload(prevReload => !prevReload);
            })
    }

    const handleFeedback = async (id) => {
        const text = await promptDialog({
            title: 'Send feedback',
            text: 'Let the instructor know what changes are needed before approval.',
            placeholder: 'Type your message here...',
            confirmText: 'Send',
        })

        if (text) {
            const feedback = { feedback: text };

            fetch(`${import.meta.env.VITE_API_URL}feedback/${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(feedback)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast({
                            type: 'success',
                            title: 'Feedback sent',
                            text: `Your message was sent for "${singleClass.className}".`,
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast({
                        type: 'error',
                        title: 'Could not send feedback',
                        text: 'Please try again.',
                    });
                })
        }
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
            <td>
                <p className='font-semibold'>{singleClass.name}</p>
                <span className='text-xs text-base-content/60'>{singleClass.email}</span>
            </td>
            <td className='text-center'>{singleClass.seats}</td>
            <td className='text-end font-semibold'>${singleClass.price}</td>
            <td>
                <span className={`badge badge-outline font-semibold capitalize ${statusStyles[singleClass.status] || 'badge-ghost'}`}>
                    {singleClass.status}
                </span>
            </td>
            <td>
                <button onClick={() => handleUpdateStatus('approved', singleClass._id)} disabled={singleClass?.status === 'approved' || singleClass?.status === 'deny'} className="btn btn-success btn-xs gap-1 rounded-full text-white">
                    <FaCheck /> Approve
                </button>
            </td>
            <td>
                <button onClick={() => handleUpdateStatus('deny', singleClass._id)} disabled={singleClass?.status === 'deny' || singleClass?.status === 'approved'} className="btn btn-error btn-xs gap-1 rounded-full text-white">
                    <FaTimes /> Deny
                </button>
            </td>
            <td>
                <button onClick={() => handleFeedback(singleClass._id)} className="btn btn-outline btn-xs gap-1 rounded-full">
                    <FaCommentDots /> Feedback
                </button>
            </td>
        </tr>
    );
};

export default ManageClassesCard;
