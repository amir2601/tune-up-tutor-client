import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';

const Error = () => {
    useTitle('Error');
    return (
        <div>
            <div className="bg-indigo-900 relative overflow-hidden h-screen">
                <img src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9" className="absolute h-full w-full object-cover" />
                <div className="inset-0 bg-black opacity-25 absolute">
                </div>
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                    <div className="w-full font-mono flex flex-col items-center relative z-10">
                        <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                            You are all alone here
                        </h1>
                        {/* <button className='bg-white text-black btn mt-14'></button> */}
                        <Link to="/"><h1 className='bg-white text-black text-lg font-semibold py-2 px-4 rounded-lg mt-14'>Back To Home</h1></Link>
                        <p className="font-extrabold text-8xl my-20 text-white animate-bounce">
                            404
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;