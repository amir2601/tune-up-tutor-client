import React from 'react';

const Slider = () => {
    return (
        <div className="carousel w-full bg-cover">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/Xk4D245/guitar.jpg" className="w-full h-[70vh]" />
                <div className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10'>
                    <h2 className='text-2xl md:text-4xl font-semibold'>Unlock your musical journey with expert guidance</h2>
                </div>
                <div className="absolute top-0 left-0 w-full h-[70vh] bg-black opacity-50"></div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide2" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/3TvTnL0/drum.jpg" className="w-full h-[70vh]" />
                <div className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10'>
                    <h2 className='text-2xl md:text-4xl font-semibold'>Embrace the rhythm of your musical dreams</h2>
                </div>
                <div className="absolute top-0 left-0 w-full h-[70vh] bg-black opacity-50"></div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide3" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/YjN6J4W/piano.jpg" className="w-full h-[70vh]" />
                <div className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10'>
                    <h2 className='text-2xl md:text-4xl font-semibold'>Ignite your musical prowess with us</h2>
                </div>
                <div className="absolute top-0 left-0 w-full h-[70vh] bg-black opacity-50"></div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide4" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/sHb4Ph4/flute.jpg" className="w-full h-[70vh]" />
                <div className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10'>
                    <h2 className='text-2xl md:text-4xl font-semibold'>Let the music guide your soul</h2>
                </div>
                <div className="absolute top-0 left-0 w-full h-[70vh] bg-black opacity-50"></div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide1" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
        </div>

    );
};

export default Slider;