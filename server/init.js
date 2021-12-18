const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
var Stream = require('stream').Transform;

const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

async function routes(req, res) {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const action = req.url.split('/')[1];
    const query = decodeURI(req.url.replace(/\/\w*\//, ''));// everything after '/search/' or '/download/'
    // console.log(action, query);

    if (action === 'search') {
        let vids = await ytSearch(query);
        vids = vids.all.map(el => {return {
            title: el.title,
            url: el.url,
            thumbnail: el.thumbnail
        }});
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        res.write(JSON.stringify(vids))
        return res.end();
    }

    if (action === 'download') {
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

        const vidName = data.media.song + ' - ' + (data.media.artist || data.author.name);

        const profile = {
            artist: (data.media.artist || data.author.name),
            name: vidName,
            tags: data.keywords?.filter(tag => !excludedTags.includes(tag)),
        }

        if (musicData.find(el => el.name === vidName)) {
            res.write(JSON.stringify({
                alreadyDownloaded: true
            }));
            return res.end();
        }// check if the song is already downloaded

        musicData.push(profile);
        
        
        fs.writeFileSync(path.resolve(__dirname, '../musicData.json'), JSON.stringify(musicData));
        
        const imageUrl = data.thumbnails.find(el => el.width === 336).url;
        https.request(imageUrl, resImage => {
            let body = new Stream();
            resImage.on('data', chunk => body.push(chunk));
            resImage.on('end', () => {
                let imagePath = path.resolve(__dirname, '../images', vidName + '.jpg');
                fs.writeFileSync(imagePath, body.read());
            });
            resImage.on('error', console.log);
        }).end();// download thumbnail
        
        let musicPath = path.resolve(__dirname, '../music', vidName + '.mp3');
        const stream = ytdl(vidUrl, { filter: 'audioonly'}).pipe(fs.createWriteStream(musicPath));

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
        return res.end();
    }

    if (action === 'delete') {
        fs.unlinkSync(path.resolve(__dirname, '../images', query + '.jpg'));
        fs.unlinkSync(path.resolve(__dirname, '../music', query + '.mp3'));
        let musicData = require('../musicData.json');
        musicData = musicData.filter(el => el.name !== query);
        fs.writeFileSync(path.resolve(__dirname, '../musicData.json'), JSON.stringify(musicData));
        return res.end();
    }
    res.write('');
    res.end();
}

const server = http.createServer(routes);
server.listen(3000);