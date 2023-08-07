import React from 'react';

const AboutTheInstruments = () => {
    return (
        <div className='my-20 px-4 md:px-0'>
            <p className='italic text-purple-400'>Dedication to Teaching</p>
            <h1 className='text-3xl md:text-5xl font-semibold my-6'>ABOUT THE <span className='text-purple-400'>INSTRUMENTS</span></h1>
            <p>Unlock your musical journey with expert guidance</p>

            <div className='grid md:grid-cols-4 gap-4 mt-16'>
                <div className='p-4'>
                    <img src="https://i.ibb.co/K6Q3XHd/guitar.png" alt="" />
                    <h3 className='text-2xl mt-4 mb-2 text-purple-400'>Guitar</h3>
                    <p className=''>The guitar's strings resonate, weaving emotions into melodies that linger in the heart's chambers.</p>
                </div>
                <div className='p-4'>
                    <img src="https://i.ibb.co/rc6Z3GY/drum-set.png" alt="" />
                    <h3 className='text-2xl mt-4 mb-2 text-purple-400'>Drum</h3>
                    <p className=''>Drums thunder like the heartbeat of rhythm, anchoring songs in a primal dance of sound.</p>
                </div>
                <div className='p-4'>
                    <img src="https://i.ibb.co/QX73Nys/flute.png" alt="" />
                    <h3 className='text-2xl mt-4 mb-2 text-purple-400'>Flute</h3>
                    <p className=''>The flute's delicate whispers carry dreams upon notes that flutter like a bird's song in the breeze.</p>
                </div>
                <div className='p-4'>
                    <img src="https://i.ibb.co/2vvLXYF/violin.png" alt="" />
                    <h3 className='text-2xl mt-4 mb-2 text-purple-400'>Violin</h3>
                    <p className=''>The violin's lament weaves tales of longing and passion, its strings echoing the human soul.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutTheInstruments;