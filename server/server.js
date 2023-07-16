const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json('Hello');
});

const port = process.env.PORT ?? 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});