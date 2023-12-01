/* IMPORTS */
const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/static/css/style.css'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/static/js/script.js'));
});

// Updated path for express.static
app.use('/public', express.static(path.join(__dirname, '/frontend/static')));

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/users.json'));
});

app.get('/users/:userid', (req, res) => {
  res.send(req.params.userid);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
