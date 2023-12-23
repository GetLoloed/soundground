import {pipeline} from 'stream';
import ytdl from 'ytdl-core';
import scdl from 'soundcloud-downloader';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';

// Set ffmpeg and ffprobe paths
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

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

        if (!url || typeof url !== 'string') {
            return res.status(400).json({error: 'URL not provided or not a string'});
        }

        const service = getService(url);

        if (!service) {
            return res.status(400).json({error: 'Invalid URL. Please enter a YouTube or SoundCloud URL.'});
        }

        let stream;
        let title;
        if (service === 'youtube') {
            const info = await ytdl.getInfo(url);
            title = info.videoDetails.title;
            stream = ytdl.downloadFromInfo(info, {quality: 'highestaudio'});
            stream = ffmpeg(stream).format('mp3').pipe();
        } else if (service === 'soundcloud') {
            const trackInfo = await scdl.getInfo(url);
            title = trackInfo.title;
            const data = await scdl.download(url);
            stream = ffmpeg()
                .input(data)
                .format('mp3')
                .pipe();
        }

        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.mp3"`);

        pipeline(stream, res, (error) => {
            if (error) {
                console.error('Pipeline error:', error);
                res.status(500).send('Download failed.');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while processing your request.'});
    }
}