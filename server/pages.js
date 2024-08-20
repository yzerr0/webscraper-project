const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});

router.get("/about", (req, res) => {
    res.send("Welcome to the about page!");
});

router.get("/login", (req, res) => {
    res.send("Welcome to the login page!");
});

router.get("/signup", (req, res) => {
    res.send("Welcome to the signup page!");
});

router.get("/profile", (req, res) => {
    res.send("Welcome to the profile page!");
});

module.exports = router;