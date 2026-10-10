import React, { useContext, useEffect, useState } from 'react';
import SelectedClassesRow from './SelectedClassesRow';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import { Reveal } from '../../../components/Shared/Animations/Reveal';
import SectionHeader from '../../../components/Shared/Dashboard/SectionHeader';
import TableSkeleton from '../../../components/Shared/Dashboard/TableSkeleton';
import EmptyState from '../../../components/Shared/Dashboard/EmptyState';

const SelectedClasses = () => {
    useTitle('Selected Classes');
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}select-class/${user?.email}`)
            .then(res => res.json())
            .then(data => setClasses(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [reload]);

    return (
        <div className='mx-auto w-full max-w-7xl space-y-6'>
            <SectionHeader
                title='My Selected Classes'
                subtitle='Pay for a class to enrol, or remove one you no longer need.'
                action={!loading && classes.length > 0 && (
                    <span className='badge badge-primary badge-outline rounded-full px-3 py-3 font-semibold'>{classes.length} selected</span>
                )}
            />

            {loading ? (
                <TableSkeleton rows={4} cols={6} />
            ) : (
                <Reveal className='surface overflow-hidden bg-base-100' direction='up'>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr className='text-xs uppercase tracking-wider text-base-content/50'>
                                    <th className='w-14'>#</th>
                                    <th>Image</th>
                                    <th>Class Name</th>
                                    <th>Instructor Name</th>
                                    <th>Price</th>
                                    <th>Delete</th>
                                    <th>Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((singleClass, index) => (
                                    <SelectedClassesRow key={singleClass._id} index={index} singleClass={singleClass} setReload={setReload} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {classes.length === 0 && (
                        <EmptyState
                            icon='🎟️'
                            title='No classes selected yet'
                            text='Browse the catalog and pick a class that excites you — it will show up right here.'
                        />
                    )}
                </Reveal>
            )}
        </div>
    );
};

export default SelectedClasses;
