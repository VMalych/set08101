var express = require('express');
var router = express.Router();

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
