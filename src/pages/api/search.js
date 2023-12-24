import ytsr from 'youtube-sr';
import scdl from 'soundcloud-downloader';

export default async (req, res) => {
    try {
        const {query} = req.query;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({error: 'Query not provided or not a string'});
        }

        const youtubeResults = await ytsr.search(query);
        const youtubeItems = youtubeResults.map(item => ({
            id: item.id,
            title: item.title,
            url: item.url,
            thumbnail: item.thumbnail.url,
            duration: item.durationFormatted,
            source: 'YouTube',
        }));

        const soundcloudResults = await scdl.search({query: query, resourceType: 'tracks'});
        const soundcloudItems = soundcloudResults.collection.map(item => ({
            id: item.id,
            title: item.title,
            url: item.permalink_url,
            thumbnail: item.artwork_url ? item.artwork_url.replace('-large', '-t500x500') : null,
            duration: item.duration / 1000,
            source: 'SoundCloud',
        }));

        let results = [];
        let i = 0, j = 0;
        while (i < youtubeItems.length || j < soundcloudItems.length) {
            if (i < youtubeItems.length) {
                results.push(youtubeItems[i++]);
            }
            if (j < soundcloudItems.length) {
                results.push(soundcloudItems[j++]);
            }
        }

        res.status(200).json({results});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while processing your request.'});
    }
};