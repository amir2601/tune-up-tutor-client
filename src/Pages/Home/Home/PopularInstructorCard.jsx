import React from 'react';

const PopularInstructorCard = ({instructor}) => {
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img src={instructor.img} alt="Shoes" /></figure>
                {/* <div className="card-body">
                    <h2 className="card-title">{instructor.name}</h2>
                    <p>{instructor.email}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default PopularInstructorCard;