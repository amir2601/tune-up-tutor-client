import React from 'react';
import { FaStar } from 'react-icons/fa';

const ClassesCard = ({ singleClass }) => {
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img src={singleClass.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.className}</h2>
                    <h2 className="text-lg"><span className='font-semibold'>Instructor Name:</span> {singleClass.name}</h2>
                    <p><span className='font-semibold'>Instructor Email:</span> {singleClass.email}</p>
                    <div className="card-actions justify-start">
                        <div className="badge badge-outline">$ {singleClass.price}</div>
                        <div className="badge badge-outline items-center gap-1 text-yellow-500"><FaStar></FaStar> {singleClass.rating}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-neutral btn-outline btn-sm">Select Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;