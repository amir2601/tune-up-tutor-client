import React from 'react';
import Slider from '../Slider/Slider';
import useTitle from '../../../Hooks/useTitle';

const Home = () => {
    useTitle('Home');

    return (
        <div>
            <Slider></Slider>
        </div>
    );
};

export default Home;