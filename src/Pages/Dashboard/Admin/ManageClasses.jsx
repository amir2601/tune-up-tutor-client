import React, { useEffect, useState } from 'react';
import ManageClassesCard from './ManageClassesCard';
import useTitle from '../../../Hooks/useTitle';
import { Reveal } from '../../../components/Shared/Animations/Reveal';
import SectionHeader from '../../../components/Shared/Dashboard/SectionHeader';
import TableSkeleton from '../../../components/Shared/Dashboard/TableSkeleton';
import EmptyState from '../../../components/Shared/Dashboard/EmptyState';

const ManageClasses = () => {
    useTitle('Manage Classes');
    const [reload, setReload] = useState(true);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}added-classes`)
            .then(res => res.json())
            .then(data => setClasses(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [reload]);

    return (
        <div className='mx-auto w-full max-w-7xl space-y-6'>
            <SectionHeader title='Manage Classes' subtitle='Approve, deny or leave feedback on instructor submissions.' />

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
                                    <th>Instructor Name &amp; Email</th>
                                    <th>Available Seats</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((singleClass, index) => (
                                    <ManageClassesCard key={singleClass._id} index={index} singleClass={singleClass} setReload={setReload} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {classes.length === 0 && (
                        <EmptyState
                            icon='📚'
                            title='No submissions yet'
                            text='Instructor class submissions awaiting review will appear here.'
                        />
                    )}
                </Reveal>
            )}
        </div>
    );
};

export default ManageClasses;
