// Importations nécessaires
import { pipeline } from 'stream';
import ytdl from 'ytdl-core';
import scdl from 'soundcloud-downloader';
import ffmpeg from 'fluent-ffmpeg';

// Définir les chemins pour ffmpeg et ffprobe en utilisant des variables d'environnement
// ou inclure directement le binaire dans le projet et référencer son chemin relatif.
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

// Fonction pour déterminer le service basé sur l'URL
const getService = (url) => {
    if (ytdl.validateURL(url)) {
        return 'youtube';
    }
    if (scdl.isValidUrl(url)) {
        return 'soundcloud';
    }
    return null;
};

// Fonction de gestion API principale
export default async (req, res) => {
    try {
        const { url } = req.query;

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'URL not provided or not a string' });
        }

        const service = getService(url);
        if (!service) {
            return res.status(400).json({ error: 'Invalid URL. Please enter a YouTube or SoundCloud URL.' });
        }

        let stream;
        let title;
        if (service === 'youtube') {
            const info = await ytdl.getInfo(url);
            title = info.videoDetails.title;
            stream = ytdl.downloadFromInfo(info, { quality: 'highestaudio' });
        } else if (service === 'soundcloud') {
            const trackInfo = await scdl.getInfo(url);
            title = trackInfo.title;
            stream = await scdl.download(url);
        }

        // Configurer la réponse avec le bon en-tête pour le téléchargement du fichier
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.mp3"`);
        ffmpeg(stream)
            .format('mp3')
            .on('end', () => {
                console.log('Conversion finished!');
            })
            .on('error', (err) => {
                console.error('Error:', err);
                res.status(500).send('Error in processing your request');
            })
            .pipe(res, { end: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};
