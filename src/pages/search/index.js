import {useState, useEffect} from 'react';
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";

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
            handleSearch();
        }
    }, [query]);

    return (
        <>
            <Metadata
                description={'Search for music from YouTube and SoundCloud.'}
                keywords={['SoundCloud', 'YouTube', 'Music', 'Search']}
                title={'Search for Music'}/>
            <Navbar/>
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-3 md:p-7 h-full">
                <div className="bg-white text-black shadow-xl rounded-lg px-5 py-5 md:px-10 md:py-5 max-w-md w-full">
                    <div className="mb-5">
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="border border-black p-2 rounded-lg focus:border-gray-700 w-full"
                            placeholder="Search for Music"
                        />
                    </div>
                </div>
                {results.map(result => (
                    <div key={result.id}
                         className="bg-white text-black shadow-md p-4 md:p-8 mt-5 rounded-lg w-full max-w-xl flex flex-col md:flex-row items-start overflow-hidden">
                        <img src={result.thumbnail} alt={result.title}
                             className="w-full md:w-40 h-40 md:h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-5"/>
                        <div>
                            <h2 className="text-lg md:text-xl font-bold mb-2">{result.author} - {result.title}</h2>
                            <p className="text-sm text-gray-500 mb-4">Source: {result.source}</p>
                            <div className="mt-4">
                                <button onClick={() => handlePreview(result.url)}
                                        className="py-2 px-4 bg-black text-white rounded-md mr-2 transition-colors duration-200 transform hover:bg-blue-500">Preview
                                </button>
                                <a className="py-2 px-4 bg-black text-white rounded-md transition-colors duration-200 transform hover:bg-blue-500"
                                   href={`/api/download?url=${encodeURIComponent(result.url)}`}>Download</a>
                            </div>
                            {currentlyPlaying === result.url && (
                                <audio controls className="mt-4">
                                    <source src={`/api/preview?url=${encodeURIComponent(result.url)}`} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}