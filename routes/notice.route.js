const express = require("express");
const app = express();
const noticeRoutes = express.Router();
const mysql = require("mysql");
const Sequelize = require("sequelize");
const sequelize = require("../DB");
const Op = require("sequelize").Op;
const Notice = require("../models/notice.js");
const jwt = require("jsonwebtoken");
// new a notice.
noticeRoutes.post("/", (req, res, next) => {
  if (!req.body.title || !req.body.describtion) {
    res.json({ message: "Please provide a no and a describtion." });
  } else {
    sequelize
      .sync()
      .then(function () {
        return Notice.create({
          title: req.body.title,
          describtion: req.body.describtion,
        }).then((notice) => {
          res.status(201).json({ message: "تم انشاء الاعلان!" });
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(403).json({ message: "didnt exists!" });
      });
  }
});

// Retrieve all ِadvirtise
noticeRoutes.get("/", (req, res, next) => {
  Notice.findAll().then((data) => {
    res.send(data);
  });
});
module.exports = noticeRoutes;
