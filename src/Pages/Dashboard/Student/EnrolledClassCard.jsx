import React from 'react';

const EnrolledClassCard = ({ singleClass, index }) => {

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
                {singleClass.instructorName}
            </td>
            <td>
                <span className='badge badge-success badge-outline font-semibold'>${singleClass.price}</span>
            </td>
        </tr>
    );
};

export default EnrolledClassCard;
