import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import MyClassesCard from './MyClassesCard';
import useTitle from '../../../Hooks/useTitle';

const MyClasses = () => {
    useTitle('My Classes')
    const { user } = useContext(AuthContext)
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}my-added-classes/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [])

    return (
        <div className='w-full mt-0'>
            <div className='text-center'>
                <h2 className='text-3xl font-semibold my-4'>My Classes</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Total Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            classes.map((singleClass, index) => <MyClassesCard key={singleClass._id} index={index} singleClass={singleClass}></MyClassesCard>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;