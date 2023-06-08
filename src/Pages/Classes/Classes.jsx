import React, { useEffect, useState } from 'react';
import ClassesCard from './ClassesCard';

const Classes = () => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}classes`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setClasses(data);
            })
    }, [])

    return (
        <div className='grid md:grid-cols-3 gap-4 mx-auto my-4'>
            {
                classes.map(singleClass => <ClassesCard key={singleClass._id} singleClass={singleClass}></ClassesCard>)
            }
        </div>
    );
};

export default Classes;