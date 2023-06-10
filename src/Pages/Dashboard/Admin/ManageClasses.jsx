import React, { useEffect, useState } from 'react';
import ManageClassesCard from './ManageClassesCard';

const ManageClasses = () => {
    const [reload, setReload] = useState(true)
    const [classes, setClasses] = useState([])
    console.log(reload);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}added-classes`)
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [reload])

    return (
        <div className='w-full mt-0'>
            <div className='text-center'>
                <h2 className='text-3xl font-semibold my-4'>Manage Classes</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name & Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            classes.map((singleClass, index) => <ManageClassesCard key={singleClass._id} index={index} singleClass={singleClass} setReload={setReload} ></ManageClassesCard>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;