import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';

const Main = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`home-page ${isDarkMode ? "dark" : "light"}`}>
            <Navbar isDarkMode={isDarkMode} onToggle={handleThemeToggle} ></Navbar>
            <div className='min-h-[calc(100vh-352px)] md:px-4 my-4'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;