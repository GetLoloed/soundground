// Import the required modules
import {pipeline} from 'stream';
import ytdl from 'ytdl-core';
import scdl from 'soundcloud-downloader';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';

// Set ffmpeg and ffprobe paths
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

// Function to determine the service of the url (Youtube or Soundcloud)
const getService = (url) => {
    if (ytdl.validateURL(url)) {
        return 'youtube';
    }
    if (scdl.isValidUrl(url)) {
        return 'soundcloud';
    }
    return null;
};

export default async (req, res) => {
    try {
        const {url} = req.query;

        // Validate if url is provided
        if (!url || typeof url !== 'string') {
            return res.status(400).json({error: 'URL not provided or not a string'});
        }

        const service = getService(url);

        // Validate if url is from supported service
        if (!service) {
            return res.status(400).json({error: 'Invalid URL. Please enter a YouTube or SoundCloud URL.'});
        }

        let stream;
        let title;
        if (service === 'youtube') {
            const info = await ytdl.getInfo(url);
            title = info.videoDetails.title;
            // Stream only the audio from the video
            stream = ytdl.downloadFromInfo(info, {quality: 'highestaudio'});
            // Convert the audio to mp3 format
            stream = ffmpeg(stream).format('mp3').pipe();
        } else if (service === 'soundcloud') {
            const trackInfo = await scdl.getInfo(url);
            title = trackInfo.title;
            const data = await scdl.download(url);
            // Convert the audio to mp3 format
            stream = ffmpeg().input(data).format('mp3').pipe()
        }

        // Set the content disposition header so the browser prompts the user to download the file
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.mp3"`);

        // Pipe the transformed stream to the response
        pipeline(stream, res, (error) => {
            if (error) {
                console.error('Pipeline error:', error);
                res.status(500).send('Download failed.');
            }
        });
    } catch (error) {
        // Log the error and send a response
        console.error(error);
        res.status(500).json({error: 'An error occurred while processing your request.'});
    }
}