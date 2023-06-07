import React from 'react';
import image1 from '../../../assets/slider/guitar.jpg';
import image2 from '../../../assets/slider/drum.jpg';
import image3 from '../../../assets/slider/piano.jpg';
import image4 from '../../../assets/slider/flute.jpg';

const Slider = () => {
    return (
        <div className="carousel w-full bg-cover">
            <div id="slide1" className="carousel-item relative w-full">
                <img src={image1} className="w-full h-[70vh]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide2" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src={image2} className="w-full h-[70vh]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide3" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src={image3} className="w-full h-[70vh]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide4" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src={image4} className="w-full h-[70vh]" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle bg-transparent text-white">❮</a>
                    <a href="#slide1" className="btn btn-circle bg-transparent text-white">❯</a>
                </div>
            </div>
        </div>

    );
};

export default Slider;