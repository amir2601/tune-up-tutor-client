import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useTitle from '../../../Hooks/useTitle';
import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { Reveal } from '../../../components/Shared/Animations/Reveal';

const AddClass = () => {
    useTitle('Add Class')
    const { user } = useContext(AuthContext);

    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const name = form.name.value;
        const email = form.email.value;
        const seats = form.seats.value;
        const price = form.price.value;
        const img = form.img.value;

        const newClass = {
            className,
            name,
            email,
            seats,
            price,
            img,
            students: 0,
            status: 'pending',
        }

        fetch(`${import.meta.env.VITE_API_URL}add-class`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class successfully added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset()
                }
            })

    }

    return (
        <div className='mx-auto w-full max-w-4xl'>
            <Reveal className='surface space-y-6 bg-base-100 p-6 sm:p-8'>
                <div className='space-y-1 text-center'>
                    <span className='eyebrow mx-auto'>New Course</span>
                    <h1 className="text-3xl font-extrabold tracking-tight">Add Class</h1>
                    <p className='text-sm text-base-content/60'>Fill in the details below to publish a new class for approval.</p>
                </div>

                <div className='alert rounded-2xl bg-primary/10 text-sm text-primary'>
                    <FaInfoCircle />
                    <span>Instructor name and email are auto-filled from your account.</span>
                </div>

                <form onSubmit={handleAddClass} className='space-y-4'>
                    <div className='grid gap-4 md:grid-cols-2'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Class Name</span>
                            </label>
                            <input type="text" name='className' placeholder="Class Name" className="input input-bordered" required />
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
                            <input type="number" name='seats' placeholder="Available Seats" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Price</span>
                            </label>
                            <input type="number" name='price' placeholder="Price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Class Image</span>
                            </label>
                            <input type="url" name='img' placeholder="Class Image" className="input input-bordered" required />
                        </div>
                    </div>
                    <button className='btn btn-primary w-full rounded-full shadow-soft' type="submit">
                        <FaPlus className='text-xs' /> Add Class
                    </button>
                </form>
            </Reveal>
        </div>
    );
};

export default AddClass;
