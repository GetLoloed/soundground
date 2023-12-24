import ytsr from 'youtube-sr';
import scScraper from 'soundcloud-scraper';

export default async (req, res) => {
    try {
        const {query} = req.query;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({error: 'Query not provided or not a string'});
        }

        // Perform search on YouTube
        const youtubeResults = await ytsr.search(query);
        const youtubeItems = youtubeResults.map(item => ({
            id: item.id,
            title: item.title,
            url: item.url,
            thumbnail: item.thumbnail.url,
            duration: item.durationFormatted,
        }));

        // Perform search on SoundCloud
        const client = new scScraper.Client();
        const soundcloudResults = await client.search(query, 'track');
        let soundcloudItems = [];
        if (soundcloudResults && soundcloudResults.collection) {
            soundcloudItems = soundcloudResults.collection.map(item => ({
                id: item.id,
                title: item.title,
                url: item.permalink_url,
                thumbnail: item.artwork_url,
                duration: item.duration,
            }));
        }

        // Combine results from both YouTube and SoundCloud
        const results = [...youtubeItems, ...soundcloudItems];

        res.status(200).json({results});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while processing your request.'});
    }
};