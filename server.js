//List of NPM and inherent packages
var mysql = require("mysql");
require("dotenv").config();
var fs = require("fs");
var express = require('express');
var app = express();
var router = express.Router();
var methodOverride = require('method-override');
// var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require("path");

app.use(methodOverride('_method'));
app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365 }}));
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory.
// you need this line here so you don't have to create a route for every single file in the public folder (css, js, image, etc)
//index.html in the public folder will over ride the root route
app.use(express.static("public"));

//sets EJS available
app.set('view engine', 'ejs');

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  
  // Your port; if not 3306
  port: 3306,
  
  // Your username
  user: process.env.DB_USER,
  
  // Your password
  password: process.env.DB_PASSWORD,  //placeholder for your own mySQL password that you store in your own .env file
  database: process.env.DB_NAME    //TBD
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/app/public/index.html'));
  console.log("getting root");
});


app.get('/survey', function(req, res) {
  res.sendFile(path.join(__dirname, '/app/public/survey.html'));
  console.log("getting survey");
});

app.post('/results', function(req, res) {
  var total = [];
  var totalScore = 0;
  var score = 0;
  console.log(req.body);
  // res.json(req.body);
  for(var i = 0; i < 10; i++)
  {
    if(req.body.score[i] == "1 (Strongly Disagree)")
    {
      console.log("change to 1");
      score = 1;
      total.push(score);
    }
    else if(req.body.score[i] == "5 (Strongly Agree)")
    {
      console.log("change to 1");
      score = 5;
      total.push(score)
    }
    else
    {
      total.push(parseInt(req.body.score[i]));
    }
  }
  console.log(total);
  for(var i = 0; i < total.length; i++)
  {
    totalScore += total[i];
  }
  console.log(totalScore);
  connection.query('INSERT INTO users (full_name, email, total_score) VALUES (?,?,?)', [req.body.full_name,req.body.email,totalScore],function(error, results, fields){
    if (error) throw error;
    console.log(results.insertId);
    // connection.query('INSERT INTO scores  VALUES (?,?,?)', [results.insertId,req.body.email,totalScore],function(error, results, fields){
  //   if (error) throw error;
  // });
    //Loop through database and calculate difference in score between current user and all other users
    connection.query('SELECT full_name,email,total_score FROM users' ,function(error, results, fields){
      if(error) throw error;
      console.log(results);
      var diff = 0;
      var currentDiff = 50;
      var closestMatch = "";
      for(var i = 0; i < results.length-1; i++)
      {
          diff = Math.abs(results[i].total_score - totalScore);
          console.log(diff);
          if(diff < currentDiff)
          {
            console.log("changing closest match to: " + results[i].full_name);
            closestMatch =  results[i];
            currentDiff = diff;
          }
      }
      console.log(closestMatch);
      res.render('pages/result', {data: closestMatch});
    });
  });
});

app.listen(3000);