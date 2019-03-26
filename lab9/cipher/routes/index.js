var path = require("path");
var dbPath = path.resolve(__dirname, "count.db");

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbPath);

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS counts (key TEXT, value INTEGER)");
	db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});

var express = require('express');
var router = express.Router();

router.get("/data", function(req, res) {
  db.get("SELECT value FROM counts", function(err, row) {
    res.json({"count" : row.value});
  });
});

router.get("/data", function(req, res) {
  db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row) {
    if (err) {
      console.err(err);
      res.status(500);
    }
	else {
      res.status(202);
    }
    res.end();
  });
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
