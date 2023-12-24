// This is a custom hook that provides URL validation and file downloading utilities
function useMusicDownload() {
    // Regular expression for matching URLs from SoundCloud or YouTube
    // It supports both www and m subdomains
    const urlPattern = new RegExp('^(https?:\\/\\/)?(www.|m.)?(soundcloud.com|snd.sc|youtube.com|youtu.be)\\/.*$');

    // This function validates a URL
    // Returns 'true' if URL matches the regular expression pattern, 'false' otherwise
    const validateUrl = (url) => {
        return urlPattern.test(url);
    };

    // This function forces a file download from the given apiURL
    const downloadFileFromApi = (apiURL) => {
        // Create a new 'a' element
        const link = document.createElement('a');
        // Set the href of the element to the API URL
        link.href = apiURL;
        // Append the 'a' element to the body of the document
        document.body.appendChild(link);
        // Programmatically click the 'a' element to start the file download
        link.click();
        // Remove the 'a' element from the body after the download has started
        document.body.removeChild(link);
    };

    // Both validateUrl and downloadFileFromApi functions are returned by the hook
    return {
        validateUrl,
        downloadFileFromApi,
    };
}

export default useMusicDownload;