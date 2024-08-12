### simple web scraper

by Youssef Zerroug

technologies:

- **express - node.js framework**
- **axios - HTTP request library**
- **nodemon - development tool library**
- **cheerio - HTML parsing/manipulation library for web scraping**

```
npm init -y
npm install express axios nodemon cheerio morgan cors
```

`cors` allows the backend to talk to the front / prevents cross origin issues

to use nodemon, edit the `package.json` file and include:

```
"scripts": {
    "start": "nodemon server.js"
}
```

run the server with

```
npm start
// or the nodemon dev server
npm run development
```

axios can be used to get the **HTML** and cheerio can be used to load the **HTML's data**

```
await axios("https://us.bape.com/collections/gender-men").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
});
// ^ must be separated in an async function
```

cheerio shares *basically* the same syntax as jQuery