const http = require('http');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

function routes(req, res) {
    const url = req.url;

    if (url === 'download') {
        const videoID = 'https://www.youtube.com/watch?v=hxqW1Eq0iP4';


        var stream = ytdl(videoID, { filter: 'audioonly'}).pipe(fs.createWriteStream('vid.mp3'));

        stream.on('finish', function() {
            console.log('done');
            process.exit();
        });              
    }
}

const server = http.createServer(routes);
server.listen(3000);