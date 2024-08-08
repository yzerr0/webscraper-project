const express = require('express');
const morgan = require('morgan');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));

async function scraper() {
    // test url
    await axios("https://us.bape.com/collections/gender-men").then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $("title").text();
        console.log(title);
    });
}

app.get("/", (req, res) => {
    res.status(200).send('Welcome to the Web Scraper API');
    return scraper();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});