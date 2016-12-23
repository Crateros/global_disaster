//Requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts")
var path = require('path');
var moment = require('moment');

//App variables
var app = express();
var db = require("./models");

//Set use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

//Define routes

//GET Home page
app.get("/", function(req, res) {
  res.render("site/home");
});

//GET About page
app.get("/about", function(req, res) {
  db.disaster.findAll({
    order: [
      ['date', 'ASC']
    ]
  }).then(function(disasters){
    res.render("site/about", {disasters: disasters, moment: moment});
  });
});

//GET all disasters
app.get('/disasters', function(req,res){
    db.disaster.findAll({
      order: [
        ['date', 'ASC']
      ]
    }).then(function(disasters){
      res.render('disasters/index', {disasters: disasters, moment: moment});
    });
});

//Get new disaster form
app.get("/disasters/new", function(req, res){
  db.disaster.findAll({
    order: [
      ['date', 'ASC']
    ]
  }).then(function(disasters){
    res.render("disasters/new", {disasters: disasters, moment: moment});
  });
});

//POST create new disaster in database from form data
app.post("/disasters/new", function(req, res){
  console.log(req.body);
  console.log(req.body.date + " " + req.body.time);
  var dbTime = req.body.date + " " + req.body.time;

  req.body.date = new Date(dbTime);
  console.log(req.body.date);
  db.disaster.create(req.body).then(function(article){
  res.redirect("/disasters");
  });
});

//GET saved disaster and create edit form
app.get("/disasters/:id/edit", function(req, res){
  db.disaster.findById(req.params.id).then(function(disaster){
  res.render("disasters/edit", {disaster: disaster, moment: moment, disasters: []});
  });
});

//PUT edit existing disaster with new information and update database
app.put("/disasters/:id", function(req, res){
  var disasterToUpdate = req.params.id;
  console.log("Im trying to get updated:", req.params.id)
  var dbTime = req.body.date + " " + req.body.time;
  req.body.date = new Date(dbTime);
  db.disaster.update({
     country: req.body.country,
     disaster_type: req.body.disaster_type,
     casualties: req.body.casualties,
     date: req.body.date,
   }, {
     where: { id: disasterToUpdate }
  }).then(function(){
  res.send();
  });
});

//DELETE delete existing article
app.delete("/disasters/:id", function(req, res) {
  var disasterToErase = req.params.id;
  db.disaster.destroy({
    where: { id: disasterToErase }
  }).then(function(){
    res.send();
  });
});

//GET one disaster by id
app.get("/disasters/:id", function(req, res){
  console.log(req.params.id);
  db.disaster.findById(req.params.id).then(function(disaster){
  res.send();
  });
});

app.listen(3000);
