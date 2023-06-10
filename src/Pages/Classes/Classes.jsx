import React, { useContext, useEffect, useState } from 'react';
import ClassesCard from './ClassesCard';
import useTitle from '../../Hooks/useTitle';
import { AuthContext } from '../../Provider/AuthProvider';

const Classes = () => {
    const {user} = useContext(AuthContext);
    useTitle('Classes')
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}classes`)
            .then(res => res.json())
            .then(data => {
                const approved = data.filter(item => item.status === "approved");
                setClasses(approved);

            })
    }, [])

    return (
        <div>
            <div className="text-sm breadcrumbs mx-auto bg-slate-300 rounded-xl w-1/6 flex justify-center">
                <ul>
                    <li><a>Home</a></li>
                    <li><a>Classes</a></li>
                </ul>
            </div>
            <h2 className='text-3xl text-center font-semibold my-2'>Classes</h2>
            <div className='grid md:grid-cols-3 gap-4 mx-auto my-4'>
                {
                    classes.map(singleClass => <ClassesCard key={singleClass._id} singleClass={singleClass}></ClassesCard>)
                }
            </div>
        </div>
    );
};

export default Classes;