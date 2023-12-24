import React from 'react';
import { Github, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="text-white py-10 px-5 ">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-10 md:mb-0">
                    <h1 className="font-bold text-xl mb-2">SoundGround</h1>
                    <p className="text-sm">Your gateway to unlimited music. Download your favorite tracks from SoundCloud and YouTube for free!</p>
                </div>
                <div className="flex space-x-4">
                    <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="https://facebook.com/your-facebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                        <Facebook className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;