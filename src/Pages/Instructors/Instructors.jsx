import React, { useEffect, useState } from 'react';
import InstructorCard from './InstructorCard';
import useTitle from '../../Hooks/useTitle';

const Instructors = () => {
    useTitle('Instructors');
    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}instructors`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInstructors(data);
            })
    }, [])

    return (
        <div>
            <div className="text-sm breadcrumbs mx-auto bg-slate-300 text-black rounded-xl w-1/6 justify-center hidden md:flex">
                <ul>
                    <li><a>Home</a></li>
                    <li><a>Instructors</a></li>
                </ul>
            </div>
            <h2 className='text-3xl text-center text-blue-400 font-semibold my-2'>Instructors</h2>
            <div className='grid md:grid-cols-3 gap-4 mx-auto my-4 px-4 md:px-0'>
                {
                    instructors.map(instructor => <InstructorCard key={instructor._id} instructor={instructor}></InstructorCard>)
                }
            </div>
        </div>
    );
};

export default Instructors;