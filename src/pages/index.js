import {useState, useEffect} from 'react';
import Image from "next/image";
import Metadata from "@/components/Metadata";

function useMusicDownload() {
    const urlPattern = new RegExp('^(https?:\\/\\/)?(www.|m.)?(soundcloud.com|snd.sc|youtube.com|youtu.be)\\/.*$');

    const validateUrl = (url) => {
        return urlPattern.test(url);
    };

    const downloadFileFromApi = (apiURL) => {
        const link = document.createElement('a');
        link.href = apiURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return {
        validateUrl,
        downloadFileFromApi,
    };
}

export default function Home() {
    const [url, setUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState("");

    const {validateUrl, downloadFileFromApi} = useMusicDownload();

    const showPreviewButton = isValidUrl && !previewUrl;
    const showAudioPlayer = isValidUrl && previewUrl;

    useEffect(() => {
        setIsValidUrl(validateUrl(url));
        if (previewUrl) setPreviewUrl(null);
    }, [url]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateUrl(url)) {
            return setError("Invalid URL. Please enter a standard SoundCloud or YouTube URL.");
        }
        const apiURL = `/api/download?url=${encodeURIComponent(url)}`;
        downloadFileFromApi(apiURL);
    };

    const handlePreview = async (event) => {
        event.preventDefault();
        if (!validateUrl(url)) {
            return setError("Invalid URL. Please enter a standard SoundCloud or YouTube URL.");
        }
        const apiURL = `/api/preview?url=${encodeURIComponent(url)}`;
        setPreviewUrl(apiURL);
    };

    return (
        <>
            <Metadata
                description={'SoundGround: Your gateway to unlimited music. Download your favorite tracks from soundcloud and YouTube for free! Experience the joy of music, anytime, anywhere.'}
                keywords={['SoundCloud', 'YouTube', 'Music', 'Download', 'Free']}
                title={'SoundGround - Unleash the Power of Music! Free Downloads from SoundCloud and YouTube!'}/>
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-3 md:p-7">

                <div className="flex justify-center py-5">
                    <Image src={'/img/soundground_white.png'} alt={'SoundGround'} width={400} height={400} priority />
                </div>

                <form onSubmit={handleSubmit}
                      className="bg-white text-black shadow-xl rounded-lg px-5 py-5 md:px-10 md:py-5 max-w-md w-full">

                    <div className="mb-5">
                        <input
                            id="url"
                            type="text"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            className="border border-black p-2 rounded-lg focus:border-gray-700 w-full"
                            placeholder="Enter Music URL"
                        />
                    </div>

                    <button type="submit"
                            className="w-full py-3 mt-5 bg-black rounded-lg font-bold text-white text-center hover:bg-gray-700">
                        Download
                    </button>

                    {showPreviewButton && (
                        <button type="button" onClick={handlePreview}
                                className="w-full py-3 mt-5 bg-black rounded-lg font-bold text-white text-center hover:bg-gray-700">
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
        </>
    )
}