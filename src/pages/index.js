import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Download, Search} from 'lucide-react';
import Metadata from "@/components/Metadata";
import Footer from "@/components/Footer";

const HomePage = () => {
    return (
        <>
            <Metadata title={'SoundGround - Unleash the Power of Music! Free Downloads from SoundCloud and YouTube!'}
                      description={'SoundGround: Your gateway to unlimited music. Download your favorite tracks from SoundCloud and YouTube for free! Experience the joy of music, anytime, anywhere.'}
                      keywords={['SoundCloud', 'YouTube', 'Music', 'Download', 'Free']}
            />
            <div
                className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
                <Image src='/img/soundground_white.png' alt='Sound Ground Logo' width={300} height={300}/>
                <div className="flex flex-col sm:flex-row space-y-10 sm:space-y-0 sm:space-x-10">
                    <div
                        className="bg-gray-800 text-white shadow-2xl rounded-lg px-5 py-10 w-full max-w-lg transition duration-500 hover:bg-gray-700">
                        <h2 className="text-2xl font-bold mb-5">Download</h2>
                        <p className="mb-5">Download your favorite tracks from SoundCloud and YouTube for free!
                            Experience the joy of music, anytime, anywhere.</p>
                        <Link href="/download"
                              className="text-white bg-gray-600 hover:bg-gray-500 rounded px-4 py-2 transition duration-300">
                            <Download className="inline-block mr-2"/>
                            Go to Download
                        </Link>
                    </div>
                    <div
                        className="bg-gray-800 text-white shadow-2xl rounded-lg px-5 py-10 w-full max-w-lg transition duration-500 hover:bg-gray-700">
                        <h2 className="text-2xl font-bold mb-5">Search</h2>
                        <p className="mb-5">Search for music from YouTube and SoundCloud. Listen to a short snippet of
                            the track before you download it.</p>
                        <Link href="/search"
                              className="text-white bg-gray-600 hover:bg-gray-500 rounded px-4 py-2 transition duration-300">
                            <Search className="inline-block mr-2"/> Go to Search
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default HomePage;
