const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const URL = 'https://www.ebay.com/sch/i.html?_from=R40&_nkw=bmw+m5&_sacat=0&_odkw=bmw&_osacat=0';

async function configureBrowser() {
    const browser = puppeteer.launch();
    const page = browser.newPage();
    await page.goto(URL); 
    return page;
}

async function checkPrice() {
    const page = await configureBrowser();
    const html = await page.content();
    const $ = cheerio.load(html);
    const price = $('s-item__price').text();
    console.log(price);
}