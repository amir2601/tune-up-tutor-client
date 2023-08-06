import React from 'react';

const PopularInstructorCard = ({instructor}) => {
    return (
        <div>
            <div className="card card-compact w-full bg-gray-200 dark:shadow-md dark:shadow-white shadow-md shadow-black hover:scale-95 duration-300">
                <figure><img src={instructor.img} alt="Shoes" /></figure>
            </div>
        </div>
    );
};

export default PopularInstructorCard;