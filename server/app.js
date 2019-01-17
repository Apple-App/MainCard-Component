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

console.log(process.env.pgun, process.env.pgpw, process.env.pghost)


app.use("/movies", routes);

module.exports = app;
//exported so tests can be run without starting server
