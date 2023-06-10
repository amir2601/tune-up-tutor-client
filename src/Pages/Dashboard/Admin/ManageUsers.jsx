import React, { useEffect, useState } from 'react';
import ManageUsersCard from './ManageUsersCard';

const ManageUsers = () => {
    const [reload, setReload] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
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
                            <th>User Name & Email</th>
                            <th>User Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => <ManageUsersCard key={user._id} index={index} user={user} setReload={setReload}></ManageUsersCard>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;