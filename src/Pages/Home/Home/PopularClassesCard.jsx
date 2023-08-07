import React from 'react';

const PopularClassesCard = ({ popularClass }) => {
    return (
        <div>
            <div className="card card-compact w-full dark:shadow-md dark:shadow-white shadow-md shadow-black hover:scale-95 duration-300">
                <figure><img className='rounded-lg' src={popularClass.img} alt="Shoes" /></figure>
            </div>
        </div>
    );
};

export default PopularClassesCard;