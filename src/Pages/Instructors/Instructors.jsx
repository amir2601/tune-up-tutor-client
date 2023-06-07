import React, { useEffect, useState } from 'react';
import InstructorCard from './InstructorCard';

const Instructors = () => {
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
        <div className='grid md:grid-cols-3 gap-4 mx-auto'>
            {
                instructors.map(instructor => <InstructorCard key={instructor._id} instructor={instructor}></InstructorCard>)
            }
        </div>
    );
};

export default Instructors;