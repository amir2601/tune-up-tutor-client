import React from 'react';
import { FaFacebookF,FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-base-300 text-base-content">
                <div>
                    <img src="https://i.ibb.co/mv9V46x/logo.png" alt="logo" />
                    <p>Tune Up Tutor<br />Providing best tutor since 2010</p>
                </div>
                <div>
                    <span className="footer-title">Social Links</span>
                    <div className="md:place-self-center md:justify-self-end">
                        <div className="grid grid-flow-col gap-4 text-xl">
                            <a href="https://www.facebook.com/riad.vai.2601" target='_blank'><FaFacebookF></FaFacebookF></a>
                            <a href="https://www.instagram.com/amir_hossin_.riad/" target='_blank'><FaInstagram></FaInstagram></a>
                            <a href="https://www.linkedin.com/in/amir-hossin-riad/" target='_blank'><FaLinkedinIn></FaLinkedinIn></a>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="footer footer-center p-4 bg-neutral text-neutral-content">
                <div>
                    <p>Copyright © 2023 - All right reserved by Tune Up Tutor</p>
                </div>
            </footer>
        </div>

    );
};

export default Footer;