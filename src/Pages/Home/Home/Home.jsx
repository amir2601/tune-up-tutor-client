import React from 'react';
import Slider from '../Slider/Slider';
import useTitle from '../../../Hooks/useTitle';
import PopularInstructor from './PopulerInstructor';

const Home = () => {
    useTitle('Home');

    return (
        <div>
            <Slider></Slider>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;