const http = require('http');
const express = require('express');
const fetch = import('node-fetch');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
  });
