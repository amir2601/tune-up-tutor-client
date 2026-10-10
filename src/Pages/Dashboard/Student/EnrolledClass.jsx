import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import EnrolledClassCard from './EnrolledClassCard';
import useTitle from '../../../Hooks/useTitle';
import { Reveal } from '../../../components/Shared/Animations/Reveal';
import SectionHeader from '../../../components/Shared/Dashboard/SectionHeader';
import TableSkeleton from '../../../components/Shared/Dashboard/TableSkeleton';
import EmptyState from '../../../components/Shared/Dashboard/EmptyState';

const EnrolledClass = () => {
    useTitle('Enrolled Classes');
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}enrolled-classes/${user?.email}`)
            .then(res => res.json())
            .then(data => setClasses(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='mx-auto w-full max-w-7xl space-y-6'>
            <SectionHeader
                title='My Enrolled Classes'
                subtitle='All the courses you are currently enrolled in.'
                action={!loading && classes.length > 0 && (
                    <span className='badge badge-success badge-outline rounded-full px-3 py-3 font-semibold'>{classes.length} enrolled</span>
                )}
            />

            {loading ? (
                <TableSkeleton rows={4} cols={5} />
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
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((singleClass, index) => (
                                    <EnrolledClassCard key={singleClass._id} index={index} singleClass={singleClass} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {classes.length === 0 && (
                        <EmptyState
                            icon='🎓'
                            title='No enrolled classes yet'
                            text='Once you complete a payment, your classes will appear here.'
                        />
                    )}
                </Reveal>
            )}
        </div>
    );
};

export default EnrolledClass;
