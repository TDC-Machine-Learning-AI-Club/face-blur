const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8090;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/script.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/utilities/script.js'));
});
  app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/utilities/style.css'));
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);