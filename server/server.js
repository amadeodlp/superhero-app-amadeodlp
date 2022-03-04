const path = require("path");
const express = require('express');
const PORT = process.env.PORT || 80;
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use("/api", (req, res) => {
  res.send({
    token: 'test123'
  })
});

app.use('https://superheroapi.com', (req, res, next) => {
  req.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`)
});