const express = require('express');
const app = express();
const memberRoutes = express.Router();
const mysql = require('mysql');
const connection= mysql.createConnection({
	host:"localhost",
  port:"3306",
	user:"root",
	password:"",
  database:"civildb"

});
connection.connect();
// Defined store route
  memberRoutes.post('/add', (req, res, next) => {
    let member = {};

    member.name = req.body.name;
    member.state = req.body.state;
    member.born_date = req.body.born_date;
    
      connection.query('INSERT INTO civildb SET ?', member, function(err, result) {
       console.log(result)
       if(err) throw err; 
  })
});

memberRoutes.get('member/{:id}', function(req, res, next) {

  let id = req.params.id;


dbConn.query('SELECT * FROM civildb WHERE id = ?' + [id], function(err, member) {
  if (err) {
console.log(err);
}
else {
res.json(member);
}
});
});
// Defined get data(index or listing) route
memberRoutes.get('/', function(req, res, next) {
      
  connection.query('SELECT * FROM civildb ',function(err,members)     {
 
    if (err) {
      console.log(err);
    }
    else {
      console.log(members);
      res.json(members);
    }
  });
});

module.exports = memberRoutes;