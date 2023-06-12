import React from 'react';

const PopularInstructorCard = ({instructor}) => {
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-md shadow-white hover:scale-95">
                <figure><img src={instructor.img} alt="Shoes" /></figure>
            </div>
        </div>
    );
};

export default PopularInstructorCard;