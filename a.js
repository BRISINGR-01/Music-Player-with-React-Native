const fs = require('fs');
const ytdl = require('ytdl-core');

// const videoID = 'https://www.youtube.com/watch?v=7wtfhZwyrcc'
const videoID = 'https://www.youtube.com/watch?v=hxqW1Eq0iP4';



var stream = ytdl(videoID, { filter: 'audioonly'}).pipe(fs.createWriteStream('vid.mp3'));


stream.on('finish', function() {
    console.log('done');
});              