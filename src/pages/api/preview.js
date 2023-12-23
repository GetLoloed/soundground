import ytdl from 'ytdl-core';
import scdl from 'soundcloud-downloader';

export default async (req, res) => {
    const url = req.query.url;

    let stream;

    let normalizedUrl = url;
    if (url.includes('m.soundcloud.com') || url.includes('on.soundcloud.com')) {
        normalizedUrl = url.replace('m.soundcloud.com', 'soundcloud.com').replace('on.soundcloud.com', 'soundcloud.com');
    } else if (url.includes('m.youtube.com')) {
        normalizedUrl = url.replace('m.youtube.com', 'youtube.com');
    }

    if (scdl.isValidUrl(normalizedUrl)) {
        stream = await scdl.download(normalizedUrl);
    } else if (ytdl.validateURL(normalizedUrl)) {
        stream = ytdl(normalizedUrl, { filter: 'audioonly' });
    } else {
        return res.status(400).json({ error: 'Invalid URL. Please enter a valid YouTube or SoundCloud URL.' });
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-disposition', 'inline');
    res.setHeader('Transfer-Encoding', 'chunked');

    stream.pipe(res);

    stream.on('end', () => {
        res.end();
    });
};