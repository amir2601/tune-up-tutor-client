import React from 'react';

const Partners = () => {
    return (
        <div className=' my-20 space-y-10'>
            <h1 className='text-3xl font-semibold text-center'>Our <span className='text-purple-400'>Partners</span></h1>
            <div className='grid md:grid-cols-5 gap-4'>
                <div className='flex justify-center black hover:scale-105 duration-300'>
                    <img className='h-20' src="https://i.ibb.co/LxGGmcL/avash.png" alt="" />
                </div>
                <div className='flex justify-center black hover:scale-105 duration-300'>
                    <img className='h-20' src="https://i.ibb.co/zJfyJkZ/shironamhin.png" alt="" />
                </div>
                <div className='flex justify-center black hover:scale-105 duration-300'>
                    <img className='h-20' src="https://i.ibb.co/k3mpnHT/nemesis.png" alt="" />
                </div>
                <div className='flex justify-center black hover:scale-105 duration-300'>
                    <img className='h-20' src="https://i.ibb.co/RcF42gb/chirkut.png" alt="" />
                </div>
                <div className='flex justify-center black hover:scale-105 duration-300'>
                    <img className='h-20' src="https://i.ibb.co/rQF1zS3/artcell.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Partners;