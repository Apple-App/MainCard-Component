require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const app = express();
const path = require('path')

const pool = require('../db/config.js')

const routes = require("./routes/routes.js");



app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/../public")));
app.use(compression());

console.log(path.join(__dirname, "/../public"))

app.use("/movies", routes);

module.exports = app;
//exported so tests can be run without starting server
