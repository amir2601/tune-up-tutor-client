import React, { useContext, useEffect, useState } from 'react';
import SelectedClassesRow from './SelectedClassesRow';
import { AuthContext } from '../../../Provider/AuthProvider';

const SelectedClasses = () => {
    const {user} = useContext(AuthContext);
    const [classes, setClasses] = useState([])
    const [reload, setReload] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}select-class/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [reload])

    return (
        <div className='w-full mt-0'>
            <div className='text-center'>
                <h2 className='text-3xl font-semibold my-4'>My Selected Classes</h2>
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
                            <th>Delete</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            classes.map((singleClass, index) => <SelectedClassesRow key={singleClass._id} index={index} singleClass={singleClass} setReload={setReload} ></SelectedClassesRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;