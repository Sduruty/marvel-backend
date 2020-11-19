const express = require("express");
const cors = require("cors");
const md5 = require("md5");
const uid2 = require("uid2");
const { default: Axios } = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

app.get("/comics", async (req, res) => {
  try {
    const ts = uid2(10);
    const hash = md5(ts + privateKey + publicKey);

    //request
    const response = await Axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT || 3200, () => {
  console.log(
    `Server Started on port ${process.env.PORT}, to shut it down, press Ctrl+C`
  );
});
