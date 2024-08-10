import express from "express";
import fetch from "node-fetch";
import {AuthType, createClient} from "webdav";


const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"));
app.use(express.json());

const NEXTCLOUD_URL = 'https://nextcloud.kiehnlein.eu'; // TODO read from request

const handle = async (req, res) => {

    const url = `${NEXTCLOUD_URL}${req.url.replace('/api/nextcloud', '')}`;
    try {
        const response = await fetch(url, {
            method: req.method,
            headers: {...req.headers, host: new URL(NEXTCLOUD_URL).host},
            body: req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'PROPFIND' ? JSON.stringify(req.body) : undefined
        });
        const data = await response.text();
        res.status(response.status).send(data);
    } catch (error) {
        res.status(500).send({error: error.message});
    }

};

app.all("/api/nextcloud/*", handle);

app.get('/api/img/*', async (req, res) => {
    const url = `${NEXTCLOUD_URL}${req.url.replace('/api/img', '')}`;
    const response = await fetch(url, {
        headers: {...req.headers, host: new URL(NEXTCLOUD_URL).host},
        // headers: {...req.headers, host: new URL(NEXTCLOUD_URL).host, Authorization: 'Basic ***********************************='},
    });
    const buffer = await response.buffer();
    res.set('Content-Type', response.headers.get('content-type'));
    res.send(buffer);

});

app.get('/api/recipes', async (req, res) => {
    const client = createClient(NEXTCLOUD_URL + '/remote.php/dav/files/admin/Recipes', {
        authType: AuthType.Password,
        username: "admin",
        password: "***************"
    });

    const files = await client.getDirectoryContents('/');
    res.send(files.map(f => ({
        name: f.basename,
        thumb: `/api/img/remote.php/dav/files/admin/Recipes${f.filename}/thumb.jpg`,
        thumb16: `/api/img/remote.php/dav/files/admin/Recipes${f.filename}/thumb16.jpg`,
        img: `/api/img/remote.php/dav/files/admin/Recipes${f.filename}/full.jpg`,
    })));

});

