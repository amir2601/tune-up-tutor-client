import React from 'react';

const PopularClassesCard = ({ popularClass }) => {
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-md shadow-white hover:scale-95">
                <figure><img src={popularClass.img} alt="Shoes" /></figure>
            </div>
            {/* <div className="card-body">
                <h2 className="card-title">{popularClass.name}</h2>
                <h2 className="card-title">{popularClass.students}</h2>
            </div> */}
        </div>
    );
};

export default PopularClassesCard;