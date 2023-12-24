# SoundGround

SoundGround is a web application allowing users to download and preview music from SoundCloud and YouTube free of
charge. It's built with React and Next.js, utilizing several libraries for downloading, converting, and previewing audio
files.

![SoundGround](public/img/meta-tags.png)

## Features

- Music download from SoundCloud and YouTube
- Audio files conversion to .mp3 format
- Music preview before downloading
- Music search on SoundCloud and YouTube
- Displaying profile information of the music uploader
- Simple and user-friendly interface

## Technologies Used

- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [youtube-sr](https://www.npmjs.com/package/youtube-sr) for YouTube video search
- [soundcloud-downloader](https://www.npmjs.com/package/soundcloud-downloader) for downloading and searching SoundCloud
  music
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) for audio files conversion to .mp3
- [node-id3](https://www.npmjs.com/package/node-id3) for writing ID3 metadata to .mp3 files
- [lucide-react](https://www.npmjs.com/package/lucide-react) for icons
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Vercel](https://vercel.com) for deployment

## How It Works

The user inserts the URL of the music they wish to download into the input field on the Download page, or they can
search for music on the Search page. The application determines whether the URL or search query is for a YouTube video
or a SoundCloud track, fetches the audio file, and lets the user preview or download it. It also fetches and displays
the profile information of the music uploader.

## How to Run the Project

1. Clone the repository
2. Install dependencies with `npm install` or `yarn install` or `pnpm install`
3. Start the development server with `npm run dev` or `yarn dev` or `pnpm dev`
4. Open your browser and navigate to `http://localhost:3000`
5. Enjoy!

## Project Structure

The project is structured as follows:

- [src/pages](src/pages): Contains the pages of the application
- [src/pages/api](src/pages/api): Contains the API routes
- [src/components](src/components): Contains the components used in the application
- [src/hooks](src/hooks): Contains the custom hooks used in the application
- [public/img](public/img): Contains the images used in the application

## Contributing

Contributions are welcome! Please read the contributing guide for more information.

## License

This project is licensed under the MIT License.