import React, { useEffect, useState } from 'react';
import PopularInstructorCard from './PopularInstructorCard';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}popular-instructors`)
            .then(res => res.json())
            .then(data => {
                setInstructors(data);
            })
    }, [])

    return (
        <div>
            <h2 className='text-3xl text-center font-semibold my-4'>Popular Instructors</h2>
            <hr className='border-2' />
            <div className='grid md:grid-cols-3 gap-4 mx-auto my-4'>
                {
                    instructors.map(instructor => <PopularInstructorCard key={instructor._id} instructor={instructor}></PopularInstructorCard>)
                }
            </div>
        </div>
    );
};

export default PopularInstructor;