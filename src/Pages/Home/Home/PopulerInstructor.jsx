import React, { useEffect, useState } from 'react';
import PopularInstructorCard from './PopularInstructorCard';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}popular-instructors`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInstructors(data);
            })
    }, [])

    return (
        <div className='grid md:grid-cols-3 gap-4 mx-auto'>
            {
                instructors.map(instructor => <PopularInstructorCard key={instructor._id} instructor={instructor}></PopularInstructorCard>)
            }
        </div>
    );
};

export default PopularInstructor;