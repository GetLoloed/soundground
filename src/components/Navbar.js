import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import Image from 'next/image';

export default function Navbar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const navigationLinks = [
        {name: 'Download', href: '/download'},
        {name: 'Search', href: '/search'},
        {name: 'Login', href: '/login'}
    ];

    return (
        <nav className='bg-black text-white'>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='flex items-center justify-around'>
                    <div className='flex items-center'>
                        <Link href='/' className={`flex-shrink-0 cursor-pointer`}>
                            <Image src='/img/soundground_white.png' alt='Sound Ground Logo' width={160} height={160}
                                   objectFit={'contain'}/>
                        </Link>
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-baseline space-x-4'>
                                {navigationLinks.map((item) => (
                                    <Link key={item.name} href={item.href}>
                                        <div className={`cursor-pointer hover:bg-gray-800 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium 
                                            ${item.href === router.pathname ? 'bg-gray-700 text-white' : ''}`}>
                                            {item.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='-mr-2 flex md:hidden z-50'>
                        <button onClick={() => setMenuOpen(!menuOpen) }
                                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>
                            <span className='sr-only'>Open main menu</span>
                            {menuOpen ? (
                                <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none'
                                     viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                                          d='M6 18L18 6M6 6l12 12'/>
                                </svg>
                            ) : (
                                <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'
                                     fill='none' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                                          d='M4 6h16M4 12h16m-7 6h7'/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className='fixed inset-0 bg-black flex items-center justify-center '
                     onClick={() => setMenuOpen(false)}>
                    <div className='space-y-1' onClick={e => e.stopPropagation()}>
                        {navigationLinks.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className='text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer'>
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
