import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
            <Image src='/img/soundground_white.png' alt='Sound Ground Logo' width={300} height={300}/>
            <div className="text-center text-white">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
                <Link href="/" className="text-white bg-gray-600 hover:bg-gray-500 rounded px-4 py-2 transition duration-300">
                        Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Custom404;