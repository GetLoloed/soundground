import { useState, useEffect } from 'react';
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import {Play, Download, Youtube, Music, SearchIcon, ExternalLink} from 'lucide-react';

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    const handleSearch = async () => {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results);
    };

    const handlePreview = (url) => {
        setCurrentlyPlaying(url);
    };

    useEffect(() => {
        if (query) {
            handleSearch().then(r => r);
        }
    }, [query]);

    return (
        <>
            <Metadata
                description={'SoundGround: Your gateway to unlimited music. Download your favorite tracks from SoundCloud and YouTube for free! Experience the joy of music, anytime, anywhere.'}
                keywords={['SoundCloud', 'YouTube', 'Music', 'Search']}
                title={'SoundGround - Search'}/>
            <Navbar/>
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 lg:p-8">
                <div className="mb-5 flex w-full max-w-6xl">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="border border-gray-300 bg-gray-800 p-3 rounded-l-lg focus:ring focus:ring-gray-400 focus:border-gray-500 flex-grow text-white"
                        placeholder="Search for Music"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-gray-700 p-3 rounded-r-md text-white">
                        <SearchIcon className="w-5 h-5"/>
                    </button>
                </div>
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.map(result => (
                        <div key={result.id}
                             className="bg-gray-800 text-white shadow-lg p-5 rounded-lg flex flex-col items-center overflow-hidden">
                            <img src={result.thumbnail} alt={result.title}
                                 className="w-full h-48 object-cover rounded-lg mb-4"/>
                            <div className="w-full text-center">
                                <h2 className="text-lg font-bold mb-2">{result.author} - {result.title}</h2>
                                <p className="text-sm text-gray-400 mb-4">
                                    Source: {result.source}
                                    {result.source === 'YouTube' ? <Youtube className="inline ml-2"/> : <Music className="inline ml-2"/>}
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <button onClick={() => handlePreview(result.url)}
                                            className="py-2 px-4 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out hover:bg-gray-700 flex items-center">
                                        <Play className="mr-2" /> Preview
                                    </button>
                                    <a className="py-2 px-4 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out flex items-center hover:bg-gray-700"
                                       href={`/api/download?url=${encodeURIComponent(result.url)}`}>
                                        <Download className="mr-2" /> Download
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
                                    <a href={result.profile.url} target="_blank" rel="noopener noreferrer" className="mt-4 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out hover:bg-gray-700 p-2 inline-flex items-center">
                                        {result.profile.name} <ExternalLink className="inline ml-1" />
                                    </a>
                                ) : (
                                    <div className="mt-4 flex items-center space-x-2 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out hover:bg-gray-700 p-2">
                                        <img src={result.profile.picture ? result.profile.picture : '/path/to/default/image.jpg'} alt={result.profile.name} className="w-10 h-10 rounded-full"/>
                                        <a href={result.profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                                            {result.profile.name} <ExternalLink className="inline ml-1" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}