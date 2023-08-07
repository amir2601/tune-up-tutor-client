import React from 'react';
import Slider from '../Slider/Slider';
import useTitle from '../../../Hooks/useTitle';
import PopularInstructor from './PopulerInstructor';
import PopularClasses from './PopularClasses';
import Faq from './Faq';
import { motion } from "framer-motion"
import ArtOfMusic from './ArtOfMusic';
import AboutTheInstruments from './AboutTheInstruments';

const Home = () => {
    useTitle('Home');

    return (
        <div className='space-y-10 my-5'>
            <Slider></Slider>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 5 }}
            >
                <PopularInstructor></PopularInstructor>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 5 }}
            >
                <PopularClasses></PopularClasses>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 5 }}
            >
                <ArtOfMusic></ArtOfMusic>
                <AboutTheInstruments></AboutTheInstruments>
                <Faq></Faq>
            </motion.div>
        </div>
    );
};

export default Home;