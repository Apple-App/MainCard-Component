// require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const app = express();
const path = require('path')
const morgan = require('morgan');

const pool = require('../db/config.js')

const routes = require("./routes/routes.js");



app.use(cors());

app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "/../public")));
app.use(compression());

app.use("/movies", routes);

app.get('/loaderio-47eba8582c0886cbf81a94fbea30f7d5', (req, res) => {
  res.sendFile(path.join(__dirname, "/../loaderio-47eba8582c0886cbf81a94fbea30f7d5.txt"))
})

module.exports = app;
//exported so tests can be run without starting server
