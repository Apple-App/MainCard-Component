const {Pool} = require('pg');
const redis = require('redis');

var redisClient = redis.createClient({
  host: 'rtest',
  port : '6379'
})


redisClient.on('ready', () => {
  console.log('redis connected')
})

redisClient.on('error', () => {
  console.log('error connecting to redis')
})


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



module.exports = {pool, redisClient};



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
