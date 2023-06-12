import React from 'react';
import Slider from '../Slider/Slider';
import useTitle from '../../../Hooks/useTitle';
import PopularInstructor from './PopulerInstructor';
import PopularClasses from './PopularClasses';
import Faq from './Faq';
import { motion } from "framer-motion"

const Home = () => {
    useTitle('Home');

    return (
        <div className='space-y-10 my-5'>
            <Slider></Slider>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <PopularInstructor></PopularInstructor>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <PopularClasses></PopularClasses>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Faq></Faq>
            </motion.div>
            {/* <PopularInstructor></PopularInstructor> */}
            {/* <PopularClasses></PopularClasses> */}
            {/* <Faq></Faq> */}
        </div>
    );
};

export default Home;