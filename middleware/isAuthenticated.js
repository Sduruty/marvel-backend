const express = require("express");
const User = require("../models/User.js");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      // take back sent token and clean it up
      const token = req.headers.authorization.replace("Bearer ", "");

      // searching for user in db
      const userFound = await User.findOne({ token: token });

      // if token (so user) found,check for id
      if (userFound) {
        req.fields.userRefId = userFound.id;
        next();
      } else {
        // if user is tryin' to fool us
        return res.status(401).json("Unauthorized access.");
      }
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

module.exports = isAuthenticated;
