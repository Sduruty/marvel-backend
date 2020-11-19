const express = require("express");
const axios = require("axios");
const router = express.Router();
const md5 = require("md5");

const date = new Date();
const ts = Math.floor(date.getTime() / 1000);

const public_key = process.env.PUBLIC_KEY;
const private_key = process.env.PRIVATE_KEY;
const hash = md5(ts + private_key + public_key);

router.get("/", async (req, res) => {
  try {
    //urlMarvel="http://gateway.marvel.com/v1/public/characters"
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${public_key}&hash=${hash}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = router;
