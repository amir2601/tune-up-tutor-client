import React from 'react';
import Slider from '../Slider/Slider';
import useTitle from '../../../Hooks/useTitle';
import PopularInstructor from './PopulerInstructor';
import PopularClasses from './PopularClasses';
import Faq from './Faq';

const Home = () => {
    useTitle('Home');

    return (
        <div className='space-y-10 my-5'>
            <Slider></Slider>
            <PopularInstructor></PopularInstructor>
            <PopularClasses></PopularClasses>
            <Faq></Faq>
        </div>
    );
};

export default Home;