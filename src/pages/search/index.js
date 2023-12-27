import { useState, useEffect } from 'react';
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import { Play, Download, Youtube, Music, ExternalLink } from 'lucide-react';
import Footer from "@/components/Footer";
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [sourceFilter, setSourceFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const constructSearchUrl = (query, page, limit) =>
        `/api/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
    const fetchSearchResults = async (url) => {
        const response = await fetch(url);
        return await response.json();
    };
    const handleSearch = async () => {
        const url = constructSearchUrl(query, currentPage + 1, resultsPerPage);
        const data = await fetchSearchResults(url);

        let filteredResults = data.results;
        if (sourceFilter !== 'all') {
            filteredResults = data.results.filter(result => result.source === sourceFilter);
        }
        setResults(filteredResults);
    };
    const handlePreview = (url) => {
        setCurrentlyPlaying(url);
    };

    useEffect(() => {
        if (window.matchMedia("(max-width: 600px)").matches) {
            setResultsPerPage(5);
        } else if (window.matchMedia("(max-width: 900px)").matches) {
            setResultsPerPage(10);
        } else {
            setResultsPerPage(15);
        }
    }, []);

    useEffect(() => {
        if (query) {
            handleSearch().then(r => r);
        }
    }, [query, sourceFilter, currentPage, resultsPerPage]);

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger l'apparition des enfants (cartes)
            },
        },
        exit: { opacity: 0 },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                y: { type: "spring", stiffness: 100 },
                duration: 0.5,
            },
        },
        exit: { y: 50, opacity: 0, transition: { duration: 0.3 } },
    };

    const whileHover = {
        scale: 1.03, // slightly grow the card
        transition: { duration: 0.3 },
    };

    return (
        <>
            <Metadata
                description={'SoundGround: Your gateway to unlimited music. Download your favorite tracks from SoundCloud and YouTube for free! Experience the joy of music, anytime, anywhere.'}
                keywords={['SoundCloud', 'YouTube', 'Music', 'Search']}
                title={'SoundGround - Search'}/>
            <Navbar/>
            <div
                className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8 flex-grow">
                <div className="mb-5 flex flex-col w-full max-w-6xl">
                    <div className="text-center text-white mb-5 mx-auto">
                        <h1 className="text-2xl font-bold">Welcome to SoundGround Search</h1>
                        <p>Search for your favorite music from SoundCloud and YouTube. Listen to a preview, download for
                            personal use, or explore artists if available. Remember, downloads are intended for personal
                            use only!</p>
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="border border-gray-300 bg-gray-800 p-3 rounded-l-lg focus:ring focus:ring-gray-400 focus:border-gray-500 flex-grow text-white"
                        placeholder="Search for Music"
                    />
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                        <button onClick={() => setSourceFilter('all')}
                                className={`py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 flex items-center
                        ${sourceFilter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`}>
                            <Music className="mr-2"/> All
                        </button>
                        <button onClick={() => setSourceFilter('YouTube')}
                                className={`py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 flex items-center
                        ${sourceFilter === 'YouTube' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`}>
                            <Youtube className="mr-2"/> YouTube
                        </button>
                        <button onClick={() => setSourceFilter('SoundCloud')}
                                className={`py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 flex items-center
                        ${sourceFilter === 'SoundCloud' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`}>
                            <Music className="mr-2"/> SoundCloud
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {results.length > 0 && (
                        <motion.div
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {results.map(result => (
                                <motion.div
                                    key={result.id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    whileHover={whileHover}
                                    className="bg-gray-800 text-white shadow-lg p-5 rounded-lg flex flex-col items-center overflow-hidden"
                                >
                                    {result.thumbnail ? (
                                        <Image src={result.thumbnail} alt={result.title} width={500} height={300}
                                               className="w-full h-48 object-cover rounded-lg mb-4"/>
                                    ) : (
                                        <Image src="/path/to/placeholder/image.jpg" alt="Placeholder" width={500}
                                               height={300} className="w-full h-48 object-cover rounded-lg mb-4"/>
                                    )}
                                    <div className="w-full text-center">
                                        <h2 className="text-lg font-bold mb-2">{result.author} - {result.title}</h2>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Source: {result.source}
                                            {result.source === 'YouTube' ? <Youtube className="inline ml-2"/> :
                                                <Music className="inline ml-2"/>}
                                        </p>
                                        <div className="flex justify-center space-x-4">
                                            <button onClick={() => handlePreview(result.url)}
                                                    className="py-2 px-4 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out hover:bg-gray-700 flex items-center">
                                                <Play className="mr-2"/> Preview
                                            </button>
                                            <a className="py-2 px-4 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out flex items-center hover:bg-gray-700"
                                               href={`/api/download?url=${encodeURIComponent(result.url)}`}>
                                                <Download className="mr-2"/> Download
                                            </a>
                                        </div>
                                        {currentlyPlaying === result.url && (
                                            <audio controls className="mt-4 w-full">
                                                <source src={`/api/preview?url=${encodeURIComponent(result.url)}`}
                                                        type="audio/mpeg"/>
                                                Your browser does not support the audio element.
                                            </audio>
                                        )}
                                        {result.source === 'YouTube' ? (
                                            <a href={result.profile.url} target="_blank" rel="noopener noreferrer"
                                               className="mt-4 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out hover:bg-gray-700 p-2 inline-flex items-center">
                                                {result.profile.name} <ExternalLink className="inline ml-1"/>
                                            </a>
                                        ) : (
                                            <div
                                                className="mt-4 flex items-center space-x-2 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out hover:bg-gray-700 p-2">
                                                <img
                                                    src={result.profile.picture ? result.profile.picture : '/path/to/default/image.jpg'}
                                                    alt={result.profile.name} className="w-10 h-10 rounded-full"/>
                                                <a href={result.profile.url} target="_blank" rel="noopener noreferrer"
                                                   className="text-blue-500 hover:text-blue-400">
                                                    {result.profile.name} <ExternalLink className="inline ml-1"/>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                {results.length > 0 && (
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={10} // replace with the total number of pages
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={({selected}) => setCurrentPage(selected)}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName={'page'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'previous'}
                        nextClassName={'next'}
                        previousLinkClassName={'previous-link'}
                        nextLinkClassName={'next-link'}
                        disabledClassName={'disabled'}
                    />
                )}
            </div>
            <Footer/>
        </>
    );
}