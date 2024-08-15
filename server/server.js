const express = require("express");
const morgan = require("morgan");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

/**
app.use(
    session({
        secret: "djS*AD&a9dgh23",
        resave: false,
        saveUninitialized: false,
    })
);

passport.use(
    function(username, password, done) {
    }
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {

})

app.use(passport.initialize());
app.use(passport.session());
*/

async function scraper(URL) {
  try {
    console.log("Scraping:", URL);
    const response = await axios.get(URL);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $("title").text();
    const body = $("body").text();
    return { title, body };
  } catch (error) {
    console.error("Error scraping:", error);
    return { error: "Failed to scrape the website" };
  }
}

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Web Scraper API");
});

app.get("/api/scrape/", async (req, res) => {
  const URL = req.query.url;
  if (!URL) {
    let error = new Error("URL is required");
    error.status = 400;
    return next(error);
  }

  const data = await scraper(URL);
  res.status(200).send(data);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
