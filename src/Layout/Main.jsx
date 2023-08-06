import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';

const Main = () => {

    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-352px)] md:px-4 my-4'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;