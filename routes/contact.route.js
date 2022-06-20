const express = require("express");
const app = express();
const contactRoutes = express.Router();
const mysql = require("mysql");
const Sequelize = require("sequelize");
const sequelize = require("../DB");
const Contact = require("../models/contact.js");
const jwt = require("jsonwebtoken");
// new Message.
contactRoutes.post("/", (req, res, next) => {
  if (!req.body.name || !req.body.message) {
    res.json({ message: "Please provide a email and a message." });
  } else {
    sequelize
      .sync()
      .then(function () {
        return Contact.create({
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
        }).then((contacts) => {
          res.status(201).json({ message: "Account created!" });
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(403).json({ message: "didnt exists!" });
      });
  }
});

// Retrieve all complaints
contactRoutes.get("/", (req, res, next) => {
  Contact.findAll().then((data) => {
    res.send(data);
  });
});

module.exports = contactRoutes;
