import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState("");

  const downloadFileFromApi = (apiURL) => {
    const link = document.createElement('a');
    link.href = apiURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiURL = `/api/download?url=${encodeURIComponent(url)}`;
    downloadFileFromApi(apiURL);
  };

  return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center py-3 md:py-7">
        <div className="bg-black shadow-xl rounded-lg p-5 md:p-10 mb-5">
          <h1 className="text-3xl font-bold text-white">Welcome to Music Download</h1>
          <p className="mt-2 text-white">Enter the URL of the music you want to download</p>
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
        </form>
      </div>
  );
}