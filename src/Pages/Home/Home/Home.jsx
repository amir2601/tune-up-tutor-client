import React from 'react';
import Slider from '../Slider/Slider';
import useTitle from '../../../Hooks/useTitle';
import PopularInstructor from './PopulerInstructor';
import PopularClasses from './PopularClasses';

const Home = () => {
    useTitle('Home');

    return (
        <div>
            <Slider></Slider>
            <PopularInstructor></PopularInstructor>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;