import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import EnrolledClassCard from './EnrolledClassCard';
import useTitle from '../../../Hooks/useTitle';

const EnrolledClass = () => {
    useTitle('Enrolled Classes')
    const { user } = useContext(AuthContext)
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}enrolled-classes/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [])

    return (
        <div className='w-full mt-0'>
            <div className='text-center'>
                <h2 className='text-3xl font-semibold my-4'>My Enrolled Classes</h2>
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
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            classes.map((singleClass, index) => <EnrolledClassCard key={singleClass._id} index={index} singleClass={singleClass}></EnrolledClassCard>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClass;