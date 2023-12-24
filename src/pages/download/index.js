import { useState, useEffect } from 'react';
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import useMusicDownload from "@/hooks/useMusicDownload";
import { Download as DownloadIcon, Music } from 'lucide-react';
import Footer from "@/components/Footer";

const ERROR_MESSAGE = "Invalid URL. Please enter a standard SoundCloud or YouTube URL.";
const API_DOWNLOAD_ENDPOINT = `/api/download?url=`;
const API_PREVIEW_ENDPOINT = `/api/preview?url=`;

export default function Download() {
    const [url, setUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { validateUrl, downloadFileFromApi } = useMusicDownload();
    const showPreviewButton = isValidUrl && !previewUrl;
    const showAudioPlayer = isValidUrl && previewUrl;

    useEffect(() => {
        setIsValidUrl(validateUrl(url));
    }, [url]);

    const validateAndSetError = (urlToValidate) => {
        if (!validateUrl(urlToValidate)) {
            setError(ERROR_MESSAGE);
            return false;
        }
        setError(""); // clear previous error
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateAndSetError(url)) {
            setIsLoading(true);
            const apiURL = API_DOWNLOAD_ENDPOINT + encodeURIComponent(url);
            await downloadFileFromApi(apiURL);
            setIsLoading(false);
        }
    };

    const handlePreview = async (event) => {
        event.preventDefault();
        if (validateAndSetError(url)) {
            const apiURL = API_PREVIEW_ENDPOINT + encodeURIComponent(url);
            setPreviewUrl(apiURL);
        }
    };

    return (
        <>
            <Metadata
                description={'SoundGround: Your gateway to unlimited music. Download your favorite tracks from SoundCloud and YouTube for free! Experience the joy of music, anytime, anywhere.'}
                keywords={['SoundCloud', 'YouTube', 'Music', 'Download', 'Free']}
                title={'SoundGround - Download'}/>
            <Navbar/>
            <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
                <div className="text-center mb-10 max-w-lg">
                    <h1 className="text-4xl font-bold mb-4 text-white">Unleash the Power of Music!</h1>
                    <p className="text-gray-400">Enter the URL from SoundCloud or YouTube to download or preview your favorite tracks. Experience music freely and effortlessly, right at your fingertips.</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-gray-800 shadow-xl rounded-lg px-5 py-5 md:px-10 md:py-10 max-w-md w-full">
                    <div className="mb-5">
                        <input
                            id="url"
                            type="text"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            className="border border-gray-600 bg-gray-700 p-3 rounded-lg focus:ring focus:ring-gray-500 focus:border-gray-500 w-full text-white"
                            placeholder="Enter Music URL"
                        />
                    </div>
                    <button type="submit"
                            className="w-full py-3 bg-black rounded-lg font-bold text-white text-center hover:bg-gray-700 flex justify-center items-center">
                        {isLoading ? <Music className="animate-spin mr-2"/> : <DownloadIcon className="mr-2"/>}
                        {isLoading ? 'Loading...' : 'Download'}
                    </button>
                    {showPreviewButton && (
                        <button type="button" onClick={handlePreview}
                                className="w-full py-3 mt-4 bg-black rounded-lg font-bold text-white text-center hover:bg-gray-700">
                            Preview
                        </button>
                    )}
                </form>
                {error && (
                    <p className="mt-5 text-red-500">{error}</p>
                )}
                {showAudioPlayer && (
                    <div className="mt-5 w-full max-w-md">
                        <audio controls className="w-full">
                            <source src={previewUrl} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
}
