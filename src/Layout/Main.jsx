import React from 'react';
import Navbar from '../components/Shared/NavBar/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
            <h2 className='text-3xl'>Hello</h2>
        </div>
    );
};

export default Main;