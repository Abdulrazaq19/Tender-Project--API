
   const express = require('express');
   const app = express(); 
   const categoryRoutes = express.Router();
   const mysql = require('mysql');
   const Sequelize = require("sequelize");
   const sequelize = require("../DB");
   const Category = require("../models/category.js");
   const Bid = require("../models/bid.js");
   const jwt = require('jsonwebtoken');
   categoryRoutes.get('/', (req, res, next) => { 
       Category.findAll()
    .then(data => {
      res.send(data);
    })
   })
   categoryRoutes.get('/:bid', (req, res, next) => { 
    
       const where = {
        name: req.params.bid
   
    }
     Category.findOne({
      where: where ,
      include:Bid
    }).then(data => {
      res.json(data);
    })
})
   categoryRoutes.post('/', (req, res, next) => { 
    
    if(!req.body.name) {
      res.json({ message: 'Please provide a category.' });
  } else {
    sequelize.sync().then(function() {
        return Category.create({ name:req.body.name})      
         .then(category => {
              res.status(201).json({ message: ' created!' });
            
          });
      }).catch(function(error) {
          console.log(error);
          res.status(403).json({ message: 'didnt exists!' });
      });
  }
   })
   
// Defined delete data(index ) route
categoryRoutes.delete('/del/:id', function(req, res, next) {
  const id = req.params.id;
  
  Category.destroy({  where: { id: id } })
 
    .then(updatedPet => {
      res.json(updatedPet);
    });
})
   module.exports=categoryRoutes;