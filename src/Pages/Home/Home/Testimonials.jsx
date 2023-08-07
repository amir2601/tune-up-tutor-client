import React from 'react';

const Testimonials = () => {
    return (
        <div className='my-20 px-4 md:px-0'>
            <h1 className='text-3xl font-semibold text-purple-400 text-center mb-10'>Testimonials</h1>

            {/* Cards */}
            <div className='grid md:grid-cols-5 gap-4 group'>

                {/* Jim */}
                <div className='text-center border border-black dark:border-gray-300 px-4 py-7 rounded-lg space-y-5 cursor-pointer group-hover:blur-sm hover:!blur-none hover:scale-105 duration-300'>
                    <div className='flex justify-center'>
                        <img className='rounded-full w-16' src="https://i.ibb.co/YP5CWx5/jim.jpg" alt="" />
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-2'>
                        <span className='font-bold'>JIM</span>
                        <br />
                        <span className='text-gray-500'>Tune Up Tutor made learning guitar simple! Clear lessons, patient instructors—my first chords, confidence.</span>
                    </p>
                    <button className='btn btn-outline btn-xs'><a href="https://www.facebook.com/jimisnotyours" target='_blank'>View Profile</a></button>
                </div>

                {/* Fahim */}
                <div className='text-center border border-black dark:border-gray-300 px-4 py-7 rounded-lg space-y-5 cursor-pointer group-hover:blur-sm hover:!blur-none hover:scale-105 duration-300'>
                    <div className='flex justify-center'>
                        <img className='rounded-full w-16' src="https://i.ibb.co/8Mh23gW/fahim.jpg" alt="" />
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-2'>
                        <span className='font-bold'>FAHIM</span>
                        <br />
                        <span className='text-gray-500'>Piano dreams realized, Tune Up Tutor delivers. Step-by-step guidance, interactive lessons—a pianist's ally!</span>
                    </p>
                    <button className='btn btn-outline btn-xs'><a href="https://www.facebook.com/Zombiecyclist28s" target='_blank'>View Profile</a></button>
                </div>

                {/* Anik */}
                <div className='text-center border border-black dark:border-gray-300 px-4 py-7 rounded-lg space-y-5 cursor-pointer group-hover:blur-sm hover:!blur-none hover:scale-105 duration-300'>
                    <div className='flex justify-center'>
                        <img className='rounded-full w-16' src="https://i.ibb.co/ZcVLfrP/anik.jpg" alt="" />
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-2'>
                        <span className='font-bold'>ANIK</span>
                        <br />
                        <span className='text-gray-500'>Flute novice to maestro, Tune Up Tutor captivated. Melodies woven, air charmed—possibilities realized.</span>
                    </p>
                    <button className='btn btn-outline btn-xs'><a href="https://www.facebook.com/link.copy.kn.koros.vai" target='_blank'>View Profile</a></button>
                </div>

                {/* Tamim */}
                <div className='text-center border border-black dark:border-gray-300 px-4 py-7 rounded-lg space-y-5 cursor-pointer group-hover:blur-sm hover:!blur-none hover:scale-105 duration-300'>
                    <div className='flex justify-center'>
                        <img className='rounded-full w-16' src="https://i.ibb.co/pd9yx0h/tamim.jpg" alt="" />
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-2'>
                        <span className='font-bold'>TAMIM</span>
                        <br />
                        <span className='text-gray-500'>Violin excellence, Tune Up Tutor's gift. Intuitive platform, dedicated teachers—strings mastered swiftly.</span>
                    </p>
                    <button className='btn btn-outline btn-xs'><a href="https://www.facebook.com/tamim7878" target='_blank'>View Profile</a></button>
                </div>

                {/* Razib */}
                <div className='text-center border border-black dark:border-gray-300 px-4 py-7 rounded-lg space-y-5 cursor-pointer group-hover:blur-sm hover:!blur-none hover:scale-105 duration-300'>
                    <div className='flex justify-center'>
                        <img className='rounded-full w-16' src="https://i.ibb.co/Twv6vR1/razib.jpg" alt="" />
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 text-sm mt-2'>
                        <span className='font-bold'>RAZIB</span>
                        <br />
                        <span className='text-gray-500'>Drumming passion fueled by Tune Up Tutor. Dynamic lessons, feedback—novice to rhythmic dynamo!</span>
                    </p>
                    <button className='btn btn-outline btn-xs'><a href="https://www.facebook.com/razib.hasan.3557" target='_blank'>View Profile</a></button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;