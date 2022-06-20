const express = require("express");
const app = express();
const offerRoutes = express.Router();
const mysql = require("mysql");
const Sequelize = require("sequelize");
const sequelize = require("../DB");
const Offer = require("../models/offer.js");
const Bid = require("../models/bid.js");
const jwt = require("jsonwebtoken");

offerRoutes.post("/", (req, res, next) => {
  if (!req.body.time) {
    res.json({ message: "Please provide a no and a description." });
  } else {
    sequelize
      .sync()
      .then(function () {
        console.log(req.body);
        return Offer.create({
          name: req.body.name,
          orgName: req.body.orgName,
          mobile: req.body.mobile,
          website: req.body.website,
          fbUrl: req.body.fbUrl,
          email: req.body.email,
          time: req.body.time,
          commerNo: req.body.commerNo,
          taxNo: req.body.taxNo,
          ACtime: req.body.ACtime,
          ACcost: req.body.ACcost,
          detail: req.body.detail,
          bidId: req.body.bidId,
        }).then((offers) => {
          res.status(201).json({ message: "offer created!" });
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(403).json({ message: "didnt exists!" });
      });
  }
});
offerRoutes.get("/", (req, res, next) => {
  Offer.findAll().then((data) => {
    res.send(data);
  });
});

offerRoutes.get("/byid/:id", (req, res, next) => {
  const where = {
    bidId: req.params.id,
  };
  Offer.findAll({
    where: where,
    limit: 5,
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ["id", "ASC"],
    ],
  }).then((data) => {
    res.json(data);
  });
});
offerRoutes.get("/cost/:id", (req, res, next) => {
  const where = {
    bidId: req.params.id,
  };
  Offer.findAll({
    where: where,
    order: [
      // Will order by max(cost) DESC
      [sequelize.fn("max", sequelize.col("ACcost"))],
    ],
  }).then((data) => {
    res.json(data);
  });
});
offerRoutes.get("/time/:id", (req, res, next) => {
  const where = {
    bidId: req.params.id,
  };
  Offer.findAll({
    where: where,
    limit: 5,
    order: [["ACtime", "ASC"]],
  }).then((data) => {
    res.json(data);
  });
});

offerRoutes.get("/:id", (req, res, next) => {
  const where = {
    bidId: req.params.id,
  };
  Offer.findAll({
    where: where,
  }).then((data) => {
    res.json(data);
  });
});
offerRoutes.get("/id/:id", (req, res, next) => {
  const where = {
    id: req.params.id,
  };
  Offer.findOne({
    where: where,
  }).then((data) => {
    res.json(data);
  });
});
offerRoutes.get("/co/:id", (req, res, next) => {
  const where = {
    bidId: req.params.id,
  };
  Offer.findAll({
    where: where,
    limit: 3,
    order: [
      ["time", "ASC"],
      ["ACtime", "ASC"],
      ["ACcost", "ASC"],
    ],
  }).then((data) => {
    res.json(data);
  });
});
offerRoutes.get("/bid/:id", (req, res, next) => {
  const where = {
    bidId: req.params.id,
  };
  Offer.findAll({
    where: where,
  }).then((data) => {
    res.json(data);
  });
});
/*
   exports.getBestSellerItems = () => SaleItem.findAll({
    attributes: ['itemId', [sequelize.fn('sum', sequelize.col('amount')), 'total']],
    group : ['SaleItem.itemId'],
    raw: true,
    order: sequelize.literal('total DESC')
  });*/
module.exports = offerRoutes;
