const express = require("express");
const axios = require("axios");
const router = express.Router();
const md5 = require("md5");

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const date = new Date();
const ts = Math.floor(date.getTime() / 1000);
const hash = md5(ts + privateKey + publicKey);

router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = router;
