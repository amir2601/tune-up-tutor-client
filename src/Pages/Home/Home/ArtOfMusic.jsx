import React from 'react';

const ArtOfMusic = () => {
    return (
        <div className='grid md:grid-cols-2 gap-4 px-4 md:px-0 my-20'>
            <div className='flex items-center'>
                <div>
                    <h1 className='md:text-5xl text-3xl text-center md:text-left font-semibold'>ART OF <span className='text-purple-400'>MUSIC</span> </h1>

                    <p className='mt-5'>
                        Music, the universal language that transcends barriers and connects hearts, is a profound manifestation of human creativity and expression. The art of music encompasses a mesmerizing blend of rhythm, melody, harmony, and lyrics, creating a tapestry of emotions that captivates listeners and leaves an indelible mark on their souls.
                    </p>
                </div>
            </div>
            <div className='flex'>
                <img className='w-[50%] rounded-l-lg' src="https://i.ibb.co/9Y7JxHG/about2.jpg" alt="" />
                <img className='w-[50%] rounded-r-lg' src="https://i.ibb.co/FH6qfXL/about1.jpg" alt="" />
            </div>
        </div>
    );
};

export default ArtOfMusic;