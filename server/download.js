const https = require('https');
const fs = require('fs');
const path = require('path');
var Stream = require('stream').Transform;

const ytdl = require('ytdl-core');

const musicFolderPath = path.resolve(__dirname, '../music');
const imagesFolderPath = path.resolve(__dirname, '../images');


module.exports = async (query, res) => {
    const vidUrl = query;
    if (!vidUrl.startsWith('https://www.youtube.com/watch?v=') && !vidUrl.startsWith('https://youtube.com/watch?v=')) return res.end();
    const musicData = require('./musicData.json');
    const excludedTags = require('./excludedTags.json');
    
    const data = (await ytdl.getBasicInfo(vidUrl)).videoDetails;

    const artistName = data.media.artist || data.author.name;
    const vidName = data.media.song ? 
                        `${data.media.song} - ${artistName}` :
                    data.title

                    
    const profile = {
        artist: artistName,
        title: vidName,
        url: data.video_url,
        tags: data.keywords?.filter(tag => !excludedTags.includes(tag)),
    }

    if (!musicData.find(el => el.title === vidName)) {
        musicData.push(profile);
        fs.writeFileSync(path.resolve(__dirname, './musicData.json'), JSON.stringify(musicData));
    }// if this data doesn't exist, add it
    if (!fs.readdirSync(imagesFolderPath).includes(vidName + '.jpg')) {
        const imageUrl = data.thumbnails.find(el => el.width === 336).url;
        https.request(imageUrl, resImage => {
            let body = new Stream();
            resImage.on('data', chunk => body.push(chunk));
            resImage.on('end', () => {
                let imagePath = path.resolve(imagesFolderPath, vidName + '.jpg');
                fs.writeFileSync(imagePath, body.read());
            });
            resImage.on('error', console.log);
        }).on('error', () => {
            // happens
        }).end();// download thumbnail
    }// if this image doesn't exist, add it
    if (!fs.readdirSync(path.resolve(imagesFolderPath, 'artists')).includes(artistName + '.jpg')) {
//ToDo
    }// if this image doesn't exist, add it
    if (!fs.readdirSync(musicFolderPath).includes(vidName + '.mp3')) {
        const stream = ytdl(vidUrl, { filter: 'audioonly'}).pipe(fs.createWriteStream(path.resolve(musicFolderPath, vidName + '.mp3')));

        stream.on('finish', () => res.end()); 
        stream.on('error', (err) => res.end());
    }// if this video doesn't exist, add it
}