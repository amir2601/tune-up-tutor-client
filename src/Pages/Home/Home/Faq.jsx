import React from 'react';

const Faq = () => {
    return (
        <div className='my-8 px-4 md:px-0'>
            <h2 className='text-3xl font-semibold text-center'>Frequently Asked <span className='text-purple-400'>Questions !!!</span></h2>
            <hr className='my-3' />

            <div className='flex flex-col md:flex-row justify-center items-center gap-10 text-center'>
                <div className='md:w-6/12'>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                        <div className="collapse-title text-xl font-medium">
                            What instruments can I learn on this website?
                        </div>
                        <div className="collapse-content">
                            <p>Our website offers a wide range of instruments for learning, including piano, guitar, drums, violin, flute, saxophone, and more. You can explore different instruments and choose the one that interests you the most.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                        <div className="collapse-title text-xl font-medium">
                            Do I need any prior musical experience to start learning on this website?
                        </div>
                        <div className="collapse-content">
                            <p>No, our website caters to learners of all levels, from absolute beginners to advanced musicians. Whether you're starting from scratch or looking to improve your skills, our lessons are designed to meet your needs.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                        <div className="collapse-title text-xl font-medium">
                            Are the lessons taught by qualified instructors?
                        </div>
                        <div className="collapse-content">
                            <p>Absolutely! Our lessons are created and taught by experienced musicians and certified instructors. They have a deep understanding of music theory, technique, and performance, ensuring you receive high-quality instruction.</p>
                        </div>
                    </div>
                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                        <div className="collapse-title text-xl font-medium">
                            Can I learn music theory on this website?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, we have dedicated lessons and resources for music theory. Learning music theory can greatly enhance your understanding of music and help you become a more well-rounded musician.</p>
                        </div>
                    </div>
                </div>
                <div className='md:w-6/12'>
                    <img className='w-96 mx-auto' src="https://i.ibb.co/RzkXT5r/Playing-Music-bro.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Faq;