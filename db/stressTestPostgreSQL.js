const {Pool} = require('pg');


const pool = new Pool({
  user : 'AriEfron',
  host : 'localhost',
  database : 'movies',
  password : '',
  port : 5432
})

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

let counter = 0;

const stressTest = () => {
  for (var i = 0; i <100000; i++) {
    let randomRecord = getRandomIntInclusive(101,10000100)
    pool.query(`select * from moviestable where id=${randomRecord};`)
    .then((result) => {
      counter = counter + 1
      if(counter > 99999) {
        console.timeEnd('99999')
        pool.end();
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


console.time('99999')
stressTest()
