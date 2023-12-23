# SoundGround

SoundGround is a web application that allows users to download music from SoundCloud and YouTube for free. It is built with React and Next.js, and uses several libraries to download and convert audio files.

![SoundGround](public/img/meta-tags.png)

## Features

- Download music from SoundCloud and YouTube
- Convert audio files to mp3 format
- Preview music before downloading
- Simple and intuitive user interface

## Technologies Used

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [ytdl-core](https://www.npmjs.com/package/ytdl-core) for downloading YouTube videos
- [soundcloud-downloader](https://www.npmjs.com/package/soundcloud-downloader) for downloading SoundCloud music
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) for converting audio files to mp3
- [node-id3](https://www.npmjs.com/package/node-id3) for writing ID3 metadata to mp3 files

## How It Works

The user enters the URL of the music they want to download into the input field. The application determines whether the URL is from a YouTube video or a SoundCloud track, downloads the audio file, converts it to mp3, and sends it to the user.

## How to Run the Project

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open your browser to `http://localhost:3000`