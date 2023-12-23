import {useState} from 'react';

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
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState("");

    const {validateUrl, downloadFileFromApi} = useMusicDownload();

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
        <div className="min-h-screen bg-black flex flex-col items-center justify-center py-3 md:py-7">

            <div className="bg-black shadow-xl rounded-lg p-5 md:p-10 mb-5">
                <h1 className="text-3xl font-bold text-white">Welcome to Music Download</h1>
                <p className="mt-2 text-white">Enter the standard URL of the SoundCloud or YouTube music you want to
                    download</p>
            </div>

            <form onSubmit={handleSubmit}
                  className="bg-white shadow-xl rounded-lg px-5 py-3 md:px-10 md:py-5 max-w-md w-full">

                <div className="mb-4">
                    <label htmlFor="url" className="block text-sm font-semibold mb-2">
                        Music URL:
                    </label>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg focus:border-gray-700 w-full"
                        placeholder="Enter Music URL"
                    />
                </div>

                <button type="submit"
                        className="w-full py-3 mt-5 bg-black rounded-lg font-bold text-white text-center hover:bg-gray-700">
                    Download
                </button>

                <button type="button" onClick={handlePreview}
                        className="w-full py-3 mt-5 bg-blue-500 rounded-lg font-bold text-white text-center hover:bg-blue-700">
                    Preview
                </button>
            </form>

            {error && (
                <p className="mt-5 text-red-500">{error}</p>
            )}

            {previewUrl && (
                <div className="mt-5 w-full max-w-md">
                    <audio controls className="w-full">
                        <source src={previewUrl} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    )

}