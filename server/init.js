const fs = require('fs');
const path = require('path');
const http = require('http');

const ytSearch = require('yt-search');

const download = require('./download');
const musicData = require('../musicData.json');
// const settings = require('../settings.json');
const musicFolderPath = path.resolve(__dirname, '../music');

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
        download(query, res);
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

    if (action === 'promptToDownload') {
        const downloadedSongs = fs.readdirSync(musicFolderPath);
        let songsToDownload = [];

        for (let i = 0; i < downloadedSongs.length; i++) {
            downloadedSongs[i] = downloadedSongs[i].replace('.mp3', '');
        }
        for (let i = 0; i < musicData.length; i++) {
            let title = musicData[i].title;
            if (!downloadedSongs.includes(title)) {
                songsToDownload.push({
                    title: musicData[i].title,
                    url: musicData[i].url,
                });
            }
        }

        res.write(JSON.stringify(songsToDownload));
        return res.end();
    }

    if (action === 'downloadAll') {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk.toString());
        }

        const songs = JSON.parse(Buffer.concat(buffers));

        for (let i = 0; i < songs.length; i++) {
            download(songs[i], res);   
        }

        return res.end();
    }

    res.write('');
    res.end();
}

const server = http.createServer(routes);
server.listen(3000);