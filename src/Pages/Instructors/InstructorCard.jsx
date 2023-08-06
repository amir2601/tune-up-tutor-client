import React from 'react';

const InstructorCard = ({instructor}) => {

    return (
        <div>
            <div className="card card-compact w-full bg-base-100 dark:shadow-md dark:shadow-white shadow-md shadow-black hover:scale-95 duration-300">
                <figure><img src={instructor.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{instructor.name}</h2>
                    <p>{instructor.email}</p>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;