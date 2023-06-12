import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
        const seats = form.seats.value;
        const price = form.price.value;

        const updateClass = {
            className,
            seats,
            price
        }
        console.log(updateClass);

        fetch(`${import.meta.env.VITE_API_URL}update-classes/${classInfo._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
        <div className='w-full'>
            <div className="card-body">
                <h1 className="text-4xl font-bold text-center">Update Class</h1>
                <hr className='border-2 border-accent' />
                <form onSubmit={handleUpdateClass}>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" name='className' placeholder="Class Name" className="input input-bordered" defaultValue={classInfo.className} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Instructor Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Instructor Name" className="input input-bordered" defaultValue={user?.displayName} readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Seats</span>
                            </label>
                            <input type="number" name='seats' placeholder="Available Seats" className="input input-bordered" defaultValue={classInfo.seats} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" name='price' placeholder="Price" className="input input-bordered" defaultValue={classInfo.price} required />
                        </div>
                    </div>
                    <input className='btn btn-accent btn-outline mt-4 w-full' type="submit" value="Update Class" />
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;