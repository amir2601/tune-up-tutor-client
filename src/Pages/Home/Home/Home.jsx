import React from 'react';
import Slider from '../Slider/Slider';
import useTitle from '../../../Hooks/useTitle';
import PopularInstructor from './PopulerInstructor';
import PopularClasses from './PopularClasses';
import Faq from './Faq';
import ArtOfMusic from './ArtOfMusic';
import AboutTheInstruments from './AboutTheInstruments';
import Testimonials from './Testimonials';
import Partners from './Partners';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import Gallery from './Gallery';
import Pricing from './Pricing';
import CtaBanner from './CtaBanner';

const Home = () => {
    useTitle('Home');

    return (
        <div className="mx-auto my-5 max-w-7xl space-y-20">
            <Slider />

            <Stats />

            <HowItWorks />

            <PopularInstructor />

            <PopularClasses />

            <ArtOfMusic />

            <AboutTheInstruments />

            <Gallery />

            <Pricing />

            <Testimonials />

            <Partners />

            <Faq />

            <CtaBanner />
        </div>
    );
};

export default Home;
