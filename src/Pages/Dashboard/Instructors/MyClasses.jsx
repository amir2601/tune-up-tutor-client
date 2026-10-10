import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import MyClassesCard from './MyClassesCard';
import useTitle from '../../../Hooks/useTitle';
import { Reveal } from '../../../components/Shared/Animations/Reveal';
import SectionHeader from '../../../components/Shared/Dashboard/SectionHeader';
import TableSkeleton from '../../../components/Shared/Dashboard/TableSkeleton';
import EmptyState from '../../../components/Shared/Dashboard/EmptyState';

const MyClasses = () => {
    useTitle('My Classes');
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}my-added-classes/${user?.email}`)
            .then(res => res.json())
            .then(data => setClasses(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='mx-auto w-full max-w-7xl space-y-6'>
            <SectionHeader
                title='My Classes'
                subtitle='Track approval status, enrolment numbers and update details.'
                action={
                    <Link to='/dashboard/add-class' className='btn btn-primary btn-sm rounded-full'>
                        <FaPlus className='text-xs' /> Add a Class
                    </Link>
                }
            />

            {loading ? (
                <TableSkeleton rows={5} cols={7} />
            ) : (
                <Reveal className='surface overflow-hidden bg-base-100'>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr className='text-xs uppercase tracking-wider text-base-content/50'>
                                    <th className='w-14'>#</th>
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
                                {classes.map((singleClass, index) => (
                                    <MyClassesCard key={singleClass._id} index={index} singleClass={singleClass} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {classes.length === 0 && (
                        <EmptyState
                            icon='🎼'
                            title="You haven't added any classes yet"
                            text='Create your first course and start welcoming students.'
                            action={
                                <Link to='/dashboard/add-class' className='btn btn-primary btn-sm rounded-full'>
                                    <FaPlus className='text-xs' /> Add your first class
                                </Link>
                            }
                        />
                    )}
                </Reveal>
            )}
        </div>
    );
};

export default MyClasses;
