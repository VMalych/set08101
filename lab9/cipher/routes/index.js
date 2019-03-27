var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cipher' });
});

router.get('/caesar/encrypted', function(req, res, next) {
  var message = req.query.message;
  res.render('cipher', { title: 'Caesar', message: message});
});

router.get('/cotr/encrypted', function(req, res, next) {
  var message = req.query.message;
  res.render('cipher', { title: 'Cotr', message: message});
});

router.get('/base64/encrypted', function(req, res, next) {
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

router.get('/base64/decrypted', function(req, res, next) {
  var message = req.query.message;
  res.render('decipher', { title: 'Base64', message: message});
});

module.exports = router;
