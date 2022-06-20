 
   const express = require('express');
   const app = express(); 
   const complaintRoutes = express.Router();
   const mysql = require('mysql');
   const Sequelize = require("sequelize");
   const sequelize = require("../DB");
   const Complaint = require("../models/complaint.js");
   const jwt = require('jsonwebtoken')
 
const nodemailer = require("nodemailer");

// The authentication controller.

// Register a user.
complaintRoutes.post('/', (req, res, next) => {
    if(!req.body.bidId || !req.body.describtion) {
      res.json({ message: 'Please provide a no and a describtion.' });
  } else {
    sequelize.sync().then(function() {
        return Complaint.create({ describtion:req.body.describtion,bidId:req.body.bidId
        })      
         .then(Complaints => {
              res.status(201).json({ message: 'تم ارسال الشكوي!' });
            
          });
      }).catch(function(error) {
          console.log(error);
          res.status(403).json({ message: 'didnt exists!' });
      });
  }
  });

    // Retrieve all complaints
    complaintRoutes.get("/", (req, res, next) => {
    Complaint.findAll()
      .then(data => {
        res.send(data);
      })
    });
  

module.exports = complaintRoutes;