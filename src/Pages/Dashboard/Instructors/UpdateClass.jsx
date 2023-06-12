import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const UpdateClass = () => {
    useTitle('Update Class')
    const { user } = useContext(AuthContext);

    const handleUpdateClass = event => {
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
        console.log(newClass);

        fetch(`${import.meta.env.VITE_API_URL}add-class`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

    }

    return (
        <div className='w-full'>
            <div className="card-body">
                <h1 className="text-4xl font-bold text-center">Add Class</h1>
                <hr className='border-2 border-accent' />
                <form onSubmit={handleUpdateClass}>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" name='className' placeholder="Class Name" className="input input-bordered" required />
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
                            <input type="number" name='seats' placeholder="Available Seats" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" name='price' placeholder="Price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Image</span>
                            </label>
                            <input type="url" name='img' placeholder="Class Image" className="input input-bordered" required />
                        </div>
                    </div>
                    <input className='btn btn-accent btn-outline mt-4 w-full' type="submit" value="Add Class" />
                </form>
                {/* <button className='btn btn-accent btn-outline mt-4'>Add Class</button> */}
            </div>
        </div>
    );
};

export default UpdateClass;