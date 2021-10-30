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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`)
});