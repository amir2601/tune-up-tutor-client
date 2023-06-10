import React from 'react';
import { Link } from 'react-router-dom';

const ManageClassesCard = ({ singleClass, index }) => {
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
                <h3 className='font-semibold'>{singleClass.name}</h3>
                <span>{singleClass.email}</span>
            </td>
            <td className='text-center'>{singleClass.seats}</td>
            <td className='text-end'>{singleClass.price}</td>
            <td>{singleClass.status}</td>
            <td>
                <button disabled={singleClass?.status === 'approved'} className="btn btn-outline btn-success btn-xs">Approve</button>
            </td>
            <td>
                <button disabled={singleClass?.status === 'deny'} className="btn btn-outline btn-error btn-xs">Deny</button>
            </td>
            <td>
                <Link className="btn btn-outline btn-xs">Feedback</Link>
            </td>
        </tr>
    );
};

export default ManageClassesCard;