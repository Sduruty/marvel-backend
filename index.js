const express = require("express");
const formidable= require("express-formidable");
const cors = require("cors");
//const md5 = require("md5");
//const uid2 = require("uid2");
//const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
//Keys
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
//Pages
const comics=require("./routes/comics");
const characters=require("./routes/characters");
app.use(comics);
app.use(characters);




app.listen(process.env.PORT, () => {
  console.log(
    `Server Started on port ${process.env.PORT}, to shut it down, press Ctrl+C`
  );
});
