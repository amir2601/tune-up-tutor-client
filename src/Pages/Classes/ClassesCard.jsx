import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ClassesCard = ({ singleClass }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const userRole = localStorage.getItem('user-role');

    const handleSelectClass = (selClass) => {
        const selectClass = { ...selClass, studentEmail: user?.email, mainClassId: singleClass._id }
        console.log(selectClass);
        if (!user) {
            return navigate('/login')
        }
        fetch(`${import.meta.env.VITE_API_URL}select-class`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(selectClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Successfully Added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div>
            <div className={singleClass.seats === 0 ? 'card card-compact w-full bg-red-500 text-white shadow-xl' : 'card card-compact w-full bg-base-100 shadow-xl'}>
                <figure><img src={singleClass.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.className}</h2>
                    <h2 className="text-lg"><span className='font-semibold'>Instructor Name:</span> {singleClass.name}</h2>
                    <p><span className='font-semibold'>Instructor Email:</span> {singleClass.email}</p>
                    <div className="card-actions justify-start">
                        <div className="badge badge-outline">Price</div>
                        <div className="badge badge-outline">$ {singleClass.price}</div>
                    </div>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleSelectClass(singleClass)} disabled={singleClass.seats === 0 || userRole === 'admin' || userRole === 'instructor' ? true : false} className="btn btn-neutral btn-outline btn-sm">Select Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;