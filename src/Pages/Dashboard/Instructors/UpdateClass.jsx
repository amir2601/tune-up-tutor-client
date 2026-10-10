import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaSave } from 'react-icons/fa';
import { Reveal } from '../../../components/Shared/Animations/Reveal';

const UpdateClass = () => {
    useTitle('Update Class');
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const classInfo = useLoaderData()

    const handleUpdateClass = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const name = form.name.value;
        const email = form.email.value;
        const seats = Number(form.seats.value);
        const price = Number(form.price.value);

        const updateClass = {
            className,
            seats,
            price
        }

        fetch(`${import.meta.env.VITE_API_URL}update-classes/${classInfo._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your class has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/dashboard/my-class')
                }
            })

    }

    return (
        <div className='mx-auto w-full max-w-4xl'>
            <Reveal className='surface space-y-6 bg-base-100 p-6 sm:p-8'>
                <div className='space-y-1 text-center'>
                    <span className='eyebrow mx-auto'>Edit Course</span>
                    <h1 className="text-3xl font-extrabold tracking-tight">Update Class</h1>
                    <p className='text-sm text-base-content/60'>Keep your class details accurate and up to date.</p>
                </div>

                <form onSubmit={handleUpdateClass} className='space-y-4'>
                    <div className='grid gap-4 md:grid-cols-2'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Class Name</span>
                            </label>
                            <input type="text" name='className' placeholder="Class Name" className="input input-bordered" defaultValue={classInfo.className} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Instructor Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Instructor Name" className="input input-bordered bg-base-200" defaultValue={user?.displayName} readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered bg-base-200" defaultValue={user?.email} readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Available Seats</span>
                            </label>
                            <input type="number" name='seats' placeholder="Available Seats" className="input input-bordered" defaultValue={classInfo.seats} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Price</span>
                            </label>
                            <input type="number" name='price' placeholder="Price" className="input input-bordered" defaultValue={classInfo.price} required />
                        </div>
                    </div>
                    <button className='btn btn-primary w-full rounded-full shadow-soft' type="submit">
                        <FaSave className='text-xs' /> Update Class
                    </button>
                </form>
            </Reveal>
        </div>
    );
};

export default UpdateClass;
