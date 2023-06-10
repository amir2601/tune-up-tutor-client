import React, { useEffect, useState } from 'react';
import PopularClassesCard from './PopularClassesCard';

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}popular-classes`)
            .then(res => res.json())
            .then(data => {
                const approved = data.filter(item => item.status === "approved");
                setPopularClasses(approved);
            })
    }, [])

    return (
        <div>
            <h2 className='text-3xl text-center font-semibold my-4'>Popular Classes</h2>
            <hr className='border-2 border-accent'/>
            <div className='grid md:grid-cols-3 gap-4 mx-auto my-4'>
                {
                    popularClasses.map(popularClass => <PopularClassesCard key={popularClass._id} popularClass={popularClass}></PopularClassesCard>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;