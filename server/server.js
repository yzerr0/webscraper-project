const express = require('express');
const morgan = require('morgan');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

async function scraper(URL = "https://us.bape.com/collections/gender-men") {
    // test url
    await axios(URL).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $("title").text();
        console.log(title);
    });
}

app.get("/", (req, res) => {
    res.status(200).send('Welcome to the Web Scraper API');
});

app.get("/api/scrape", (req, res) => {
    return scraper();
    /*
    const URL = req.query.url;
    if (!URL) {
        res.status(400).send('Please provide a URL');
    }
    scraper(URL).then((data) => {
        res.status(200).send(data);
    });
    */
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});