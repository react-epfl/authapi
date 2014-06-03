var fs = require('fs');

var hskey = fs.readFileSync('authapi-key.pem');
var hscert = fs.readFileSync('authapi-cert.pem');
var options = {
    key: hskey,
    cert: hscert
};

var express = require('express');
var app = express();
var https = require('https');
var server = https.createServer(options,app);

var port = process.env.PORT || 8093;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the token verification API!' });
})

router.get('/verify_token', function(req, res) {
  var tokenVerified = (req.query.token === 'skfjs343kjKJ');

  res.json(tokenVerified);
});

app.use('/', router);

server.listen(port);
console.log('The server is listening on port ' + port);