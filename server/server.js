const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
initRoutes(app);

const port = process.env.PORT ?? 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
