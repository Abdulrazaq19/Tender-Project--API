const express = require("express");
var moment = require("moment");
const app = express();
const bidRoutes = express.Router();
const mysql = require("mysql"); 
const Sequelize = require("sequelize");
const sequelize = require("../DB");
const Op = require("sequelize").Op;
const Bid = require("../models/bid.js");
const User = require("../models/User.js");
const PATH = "../public/uploads/image";
const multer = require("multer");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/assets/lib/upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const optOffer = require("../models/optOffer.js");
const Offer = require("../models/offer.js");
const Category = require("../models/category.js");
// Defined store route

let upload = multer({
  storage: storage,
});
// POST File
bidRoutes.post("/file", upload.single("image"), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    console.log("File is available!");
    let bid = req.file.originalname;
    return res.json(bid);
  }
});
bidRoutes.get("/bid", (req, res, next) => {
  Bid.findAll().then((data) => {
    res.json(data);
  });
});
// Defined get all open Bid data(index or listing) route
bidRoutes.get("/open", (req, res, next) => {
  var m = moment().format("YYYY-MM-DD");
  Bid.findAll({
    where: {
      endDate: {
        [Op.gt]: m,
      },
    },
  }).then((data) => {
    res.json(data);
  });
});
// Defined get all closed Bid data(index or listing) route
bidRoutes.get("/closed", (req, res, next) => {
  var m = moment().format("YYYY-MM-DD");
  const where = {
    [Op.or]: [{ published: false }, { endDate: { [Op.lt]: m } }],
  };
  Bid.findAll({
    where: where,
    limit: 5,
  }).then((data) => {
    res.json(data);
  });
});
// Defined get One Bid data with offer(index ) route
bidRoutes.get("/id/:id", (req, res, next) => {
  const where = {
    id: req.params.id,
  };
  Bid.findOne({
    where: where,
    include: Offer,
  }).then((data) => {
    res.json(data);
  });
});
// Defined get all closed Bid data(index or listing) route
bidRoutes.get("/archif", (req, res, next) => {
  Bid.findAll({
    include: optOffer,
  }).then((data) => {
    res.json(data);
  });
});
// Defined add Bid data route
bidRoutes.post("/", upload.single("image"), (req, res, next) => {
  if (!req.body.title || !req.body.budget || !req.body.CategoryId) {
    res.json({ message: "Please provide a no and a description." });
  } else {
    sequelize
      .sync()
      .then(function () {
        return Bid.create({
          title: req.body.title,
          local: req.body.local,
          specfication: req.body.specfication,
          budget: req.body.budget,
          domain: req.body.domain,
          endDate: req.body.endDate,
          description: req.body.description,
          published: true,
          CategoryId: req.body.CategoryId,
          bidPaper: req.body.bidPaper,
        }).then((bid) => {
          res.status(201).json(bid);
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(403).json({ message: "didnt exists!" });
      });
  }
});
// Defined select the opt offer data route
bidRoutes.post("/opt", (req, res, next) => {
  if (!req.body.bidId) {
    res.json({ message: "Please provide an Bid id." });
  } else {
    sequelize
      .sync()
      .then(function () {
        return optOffer
          .create({ offerId: req.body.offerId, bidId: req.body.bidId })
          .then((bid) => {
            res.status(201).json({ message: "Bid created!" });
          });
      })
      .catch(function (error) {
        console.log(error);
        res.status(403).json({ message: "didnt exists!" });
      });
  }
});
// Defined get One Bid data(index ) route
bidRoutes.get("/:id", function (req, res, next) {
  let id = req.params.id;
  Bid.findByPk(id).then((bid) => {
    res.status(200).json(bid);
  });
});
// Defined get data(index or listing) route
bidRoutes.get("/", function (req, res, next) {
  var m = moment().format("YYYY-MM-DD");
  const where = {
    [Op.or]: [{ published: true }, { endDate: { [Op.gt]: m } }],
  };
  Bid.findAll({ where: where }).then((data) => {
    // Send all as response
    res.json(data);
  });
});
// Defined get all data(index or listing) route
// Defined delete data(index ) route
bidRoutes.delete("/del/:id", function (req, res, next) {
  const id = req.params.id;

  Bid.destroy({ where: { id: id } })
  .then((updatedPet) => {
    res.json(updatedPet);
  });
});
// Defined update bid(index ) route
bidRoutes.put("/edit/:id", function (req, res, next) {
  const id = req.params.id;
  Bid.update(
    {
      title: req.body.title,
      local: req.body.local,
      budget: req.body.budget,
      endDate: req.body.endDate,
      domain: req.body.domain,
      description: req.body.description,
      published: req.body.published,
      CategoryId: req.body.CategoryId,
    },
    {
      where: { id: id },
    }
  ).then((updatedPet) => {
    res.json(updatedPet);
  });
});

module.exports = bidRoutes;
