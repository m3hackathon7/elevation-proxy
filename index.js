var express = require('express');
var request = require('request');

var port = process.env['PORT'] || 3333;

var app = express();
app.get('/routes', createProxyRoute('http://maps.googleapis.com/maps/api/directions/json'));
app.get('/elevations', createProxyRoute('https://maps.googleapis.com/maps/api/elevation/json'));

app.listen(port, function() {
  console.error('Listening on', port);
});

/**
 * Creates a route that proxies request with query string.
 * @param {String} url - URL of proxy target
 */
function createProxyRoute(url) {
  return function(req, res) {
    var params = { url: url, qs: req.query };
    // TODO: Handle error.
    res.writeHead(200, corsHeader());
    request.get(params).pipe(res);
  };
}

function corsHeader() {
  return {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Origin': '*'
  };
}
