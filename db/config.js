const {Pool} = require('pg');
var pool;

if (process.env.NODE_ENV === 'production') { 
  pool = new Pool({
    user : process.env.pgun,
    host : process.env.pghost,
    database : 'movies',
    password : process.env.pw,
    port : 5432
  })

} else {
  pool = new Pool({
    user : 'AriEfron',
    host : 'localhost',
    database : 'movies',
    password : '',
    port : 5432
  })
}

module.exports = pool;



// const mongoose = require("mongoose");

// if (process.env.NODE_ENV === "production") {
//   mongoose.connect(
//     process.env.MONGO_URI,
//     { useNewUrlParser: true }
//   );
// } else {
//   mongoose.connect(
//     "mongodb://localhost/spottypotatoes",
//     { useNewUrlParser: true }
//   );
// }

// module.exports = mongoose.connection;
