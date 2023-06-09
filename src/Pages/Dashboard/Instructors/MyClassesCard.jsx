import React from 'react';
import { Link } from 'react-router-dom';

const MyClassesCard = ({ singleClass, index }) => {
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
            <td>{singleClass.status}</td>
            <td className='text-center'>{singleClass.students}</td>
            <td>
                <Link className="btn btn-ghost btn-xs">Feedback</Link>
            </td>
            <td>
                <Link className="btn btn-ghost btn-xs">Update</Link>
            </td>
        </tr>
    );
};

export default MyClassesCard;