import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {MenuIcon, XIcon} from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const navigationLinks = [
        {name: 'Download', href: '/download'},
        {name: 'Search', href: '/search'},
        {name: 'Login', href: '/login'}
    ];

    return (
        <nav className='bg-gradient-to-r from-gray-900 to-black text-white shadow-lg'>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Main site title or logo */}
                    <Link href='/' className='text-xl font-bold'>
                        Sound Ground
                    </Link>
                    {/* Desktop Menu Items */}
                    <div className='hidden md:flex'>
                        <div className='ml-10 flex items-baseline space-x-4'>
                            {navigationLinks.map((item) => (
                                <Link key={item.name} href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-white transition duration-300
                                                ${item.href === router.pathname ? 'bg-gray-700 text-white' : 'text-gray-300'}`}>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className='-mr-2 flex md:hidden'>
                        <button onClick={() => setMenuOpen(!menuOpen)}
                                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none'>
                            <span className='sr-only'>Open main menu</span>
                            {menuOpen ? <XIcon className="h-6 w-6"/> : <MenuIcon className="h-6 w-6"/>}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className='md:hidden'>
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 bg-opacity-90'>
                        {navigationLinks.map((item) => (
                            <Link key={item.name} href={item.href} className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 text-white transition duration-300
                                            ${item.href === router.pathname ? 'bg-gray-700' : ''}`}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
