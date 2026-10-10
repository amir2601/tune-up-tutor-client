import React, { useEffect, useState } from 'react';
import ManageUsersCard from './ManageUsersCard';
import useTitle from '../../../Hooks/useTitle';
import { Reveal } from '../../../components/Shared/Animations/Reveal';
import SectionHeader from '../../../components/Shared/Dashboard/SectionHeader';
import TableSkeleton from '../../../components/Shared/Dashboard/TableSkeleton';
import EmptyState from '../../../components/Shared/Dashboard/EmptyState';

const ManageUsers = () => {
    useTitle('Manage Users');
    const [reload, setReload] = useState(true);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}users`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [reload]);

    return (
        <div className='mx-auto w-full max-w-7xl space-y-6'>
            <SectionHeader title='Manage Users' subtitle='Control access by assigning admin or instructor roles.' />

            {loading ? (
                <TableSkeleton rows={5} cols={5} />
            ) : (
                <Reveal className='surface overflow-hidden bg-base-100'>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr className='text-xs uppercase tracking-wider text-base-content/50'>
                                    <th className='w-14'>#</th>
                                    <th>Image</th>
                                    <th>User Name &amp; Email</th>
                                    <th>User Role</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <ManageUsersCard key={user._id} index={index} user={user} setReload={setReload} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <EmptyState icon='👥' title='No users found' text='Registered members will be listed here.' />
                    )}
                </Reveal>
            )}
        </div>
    );
};

export default ManageUsers;
