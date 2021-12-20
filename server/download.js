const https = require('https');
const fs = require('fs');
const path = require('path');
var Stream = require('stream').Transform;

const ytdl = require('ytdl-core');

const musicFolderPath = path.resolve(__dirname, '../music');


module.exports = async (query, res) => {
    const vidUrl = query;
        if (!vidUrl.startsWith('https://www.youtube.com/watch?v=') && !vidUrl.startsWith('https://youtube.com/watch?v=')) {
            res.write(JSON.stringify({
                error: true
            }));
            return res.end();
        };
        const musicData = require('../musicData.json');
        const excludedTags = require('../excludedTags.json');
        
        const data = (await ytdl.getBasicInfo(vidUrl)).videoDetails;

        const vidName = `${data.media.song} - ${data.media.artist || data.author.name}`;

        const profile = {
            artist: (data.media.artist || data.author.name),
            title: vidName,
            url: data.video_url,
            tags: data.keywords?.filter(tag => !excludedTags.includes(tag)),
        }

        if (musicData.find(el => el.name === vidName)) {
            // res.write(JSON.stringify({
            //     alreadyDownloaded: true
            // }));
            // return res.end();
        }// check if the song is already downloaded

        musicData.push(profile);
        
        
        fs.writeFileSync(path.resolve(__dirname, '../musicData.json'), JSON.stringify(musicData));
        
        const imageUrl = data.thumbnails.find(el => el.width === 336).url;
        console.log(imageUrl);// not working
        https.request(imageUrl, resImage => {
            console.log(imageUrl);
            let body = new Stream();
            resImage.on('data', chunk => {console.log(chunk);body.push(chunk)});
            resImage.on('end', () => {
                let imagePath = path.resolve(__dirname, '../images', vidName + '.jpg');
                console.log(imagePath);
                fs.writeFileSync(imagePath, body.read());
            });
            resImage.on('error', console.log);
        }).end();// download thumbnail
        
        const stream = ytdl(vidUrl, { filter: 'audioonly'}).pipe(fs.createWriteStream(path.resolve(musicFolderPath, vidName + '.mp3')));

        stream.on('finish', () => {
            res.write(JSON.stringify({
                done: true
            }));
            return res.end();
        }); 
        stream.on('error', (err) => {
            res.write(JSON.stringify({
                error: true
            }));
            return res.end();
        });
}