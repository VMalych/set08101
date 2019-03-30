'use strict';
var express = require('express');
var router = express.Router();

const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const logger = winston.createLogger({
	level: 'debug',
	format: format.combine(
			format.timestamp(),
			format.json()
		),
	trasnports: [new transports.File({
		filename: 'app.log',
		'timestamp': true
	})]
});

const MongoClient = require("mongodb").MongoClient;

const MONGO_URL = "mongodb+srv://ViktorMalych:9rrkGf98wxk5zlNc4eRf%21@viktorbase-44exb.mongodb.net/test?retryWrites=true";

MongoClient.connect(MONGO_URL, (err, client) => {
  var db = client.db("notetaker");
  
  if (err) {
  return console.log(err);
  }
  
  db.collection("notes").insertOne(
    {
	  title: "Hello MongoDB",
	  text: "Hopefully this works!"
	},
    function (err, res) {
	  if (err) {
        db.close();
        return console.log(err);
	  }
      client.close();
    }
  )
});

const bcrypt = require('bcrypt');

var userpw = "kappa";
var hash = bcrypt.hashSync(userpw, 10);
console.log("Hashed password: " + hash);

console.log("Using password: '" + userpw + "' we get: ");
if (bcrypt.compareSync(userpw, hash))
{
	logger.log("info", "match");
}
else
{
	logger.log("info", "no match");
}

userpw = "";

function isAuthenticated(req, res, next)
{
	userpw = req.query.password || "";
	console.log("Authenticating: " + (req.query.username || "no one"));
	
	if (bcrypt.compareSync(userpw, hash))
	{
		logger.log("info", "Authorization success");
		return next();
	}
	
	logger.warn("Authorization fail");
	res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Cipher' });
});

router.get('/login', function(req, res, next) {
	res.render('login');
});

router.get('/caesar/encrypted', function(req, res, next) {
  var message = req.query.message;
  res.render('cipher', { title: 'Caesar', message: message});
});

router.get('/cotr/encrypted', function(req, res, next) {
  var message = req.query.message;
  res.render('cipher', { title: 'Cotr', message: message});
});

router.get('/base64/encrypted', isAuthenticated, function(req, res, next) {
  var message = req.query.message;
  res.render('cipher', { title: 'Base64', message: message});
});

router.get('/caesar/decrypted', function(req, res, next) {
  var message = req.query.message;
  res.render('decipher', { title: 'Caesar', message: message});
});

router.get('/cotr/decrypted', function(req, res, next) {
  var message = req.query.message;
  res.render('decipher', { title: 'Cotr', message: message});
});

router.get('/base64/decrypted', isAuthenticated, function(req, res, next) {
  var message = req.query.message;
  res.render('decipher', { title: 'Base64', message: message});
});

module.exports = router;
