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

async function scraper(URL) {
    try {
        console.log('Scraping:', URL);
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $("title").text();
        const body = $("body").text();
        return { title, body };
    } catch (error) {
        console.error('Error scraping:', error);
        return { error: 'Failed to scrape the website' };
    }
}

app.get("/", (req, res) => {
    res.status(200).send('Welcome to the Web Scraper API');
});

app.get("/api/scrape/", async (req, res) => {
    const URL = req.query.url;
    if (!URL) {
        return res.status(400).send('Please provide a URL');
    }

    const data = await scraper(URL);
    res.status(200).send(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
