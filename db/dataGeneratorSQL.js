const faker = require('faker')
const youTubeVids = require('./youTubeLinks.js')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvPath = '/usr/local/var/postgres/moviesCSV.csv';
const csvPathRemote= '/home/ubuntu/moviesCSV.csv'
const {Pool} = require('pg');
const conString = 'postgres://postgres@18.216.154.184:5432/movies'
const q = 'copy moviestable(id,title,year,video,image,ac_tomatometer,ac_average_rating,ac_reviews_counted,ac_fresh,ac_rotten,consensus,audience_score,aud_average_rating,user_ratings,tc_tomatometer,tc_average_rating,tc_reviews_counted,tc_fresh,tc_rotten) FROM \'moviesCSV.csv\' delimiter \',\' csv header;'
const qRemote = 'copy moviestable(id,title,year,video,image,ac_tomatometer,ac_average_rating,ac_reviews_counted,ac_fresh,ac_rotten,consensus,audience_score,aud_average_rating,user_ratings,tc_tomatometer,tc_average_rating,tc_reviews_counted,tc_fresh,tc_rotten) FROM \'/home/ubuntu/moviesCSV.csv\' delimiter \',\' csv header;'



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var idCounter = 101


let generateData = (n) => {
  let dataCol = []
  for (var i = 0; i < n; i++) {
    let all_critics_fresh = getRandomIntInclusive(0, 10000);
    let all_critics_rotten = getRandomIntInclusive(0, 10000);
    let all_criits_total = all_critics_fresh + all_critics_rotten
    let top_critics_fresh = getRandomIntInclusive(0, 10000);
    let top_critics_rotten = getRandomIntInclusive(0, 10000);
    let top_criits_total = all_critics_fresh + all_critics_rotten
    let randomImage = getRandomIntInclusive(1,305)
    let dataObj = {
      'id' : idCounter,
      'title' : faker.lorem.words(getRandomIntInclusive(1,3)),
      'year' : getRandomIntInclusive(1900,2019),
      'video' : youTubeVids[getRandomIntInclusive(0,99)],
      'image' : `https://s3.amazonaws.com/bad-apples-images/movie-posters/${randomImage}.jpg`,
      'ac_tomatometer' : getRandomIntInclusive(0,100),
      'ac_average_rating': Number(getRandomArbitrary(0,10).toFixed(1)),
      'ac_reviews_counted' : all_criits_total,
      'ac_fresh' : all_critics_fresh,
      'ac_rotten' : all_critics_rotten,
      'consensus' : faker.lorem.sentences(3),
      'audience_score': getRandomIntInclusive(0,100),
      'aud_average_rating' : Number(getRandomArbitrary(0,5).toFixed(1)),
      'user_ratings' : getRandomIntInclusive(0,10000),
      'tc_tomatometer': getRandomIntInclusive(0,100),
      'tc_average_rating' : Number(getRandomArbitrary(0,10).toFixed(1)),
      'tc_reviews_counted' : top_criits_total,
      'tc_fresh' : top_critics_fresh,
      'tc_rotten' : top_critics_rotten
    }
    idCounter += 1
    dataCol.push(dataObj)
  }
  return dataCol

}



const csvWriter = createCsvWriter({
  path : csvPathRemote,
  header : [
    {id: 'id', title: 'id'},
    {id: 'title', title : 'title'},
    {id: 'year', title : 'year'},
    {id : 'video', title : 'video'},
    {id: 'image', title : 'image'},
    {id: 'ac_tomatometer', title :'ac_tomatometer'},
    {id: 'ac_average_rating', title : 'ac_average_rating'},
    {id : 'ac_reviews_counted', title : 'ac_reviews_counted'},
    {id: 'ac_fresh', title : 'ac_fresh'},
    {id: 'ac_rotten', title : 'ac_rotten'},
    {id: 'consensus', title : 'consensus'},
    {id: 'audience_score', title : 'audience_score'},
    {id: 'aud_average_rating', title : 'aud_average_rating'},
    {id: 'user_ratings', title : 'user_ratings'},
    {id: 'tc_tomatometer', title : 'tc_tomatometer'},
    {id: 'tc_average_rating', title: 'tc_average_rating'},
    {id: 'tc_reviews_counted', title: 'tc_reviews_counted'},
    {id: 'tc_fresh', title: 'tc_fresh'},
    {id: 'tc_rotten', title: 'tc_rotten'}
  ]
})

// const pool = new Pool({ //local 
//   user : 'AriEfron',
//   host : 'localhost',
//   database : 'movies',
//   password : '',
//   port : 5432
// })

const pool = new Pool({ //remote 
  user : 'postgres',
  host : 'localhost',
  database : 'movies',
  password : '',
  port : 5432
})


const dataPop = () => {
  let dataArr = generateData(100);
  csvWriter.writeRecords(dataArr)
  .then(() => {
    if (idCounter < 100) {
      dataPop()
    } else {      
      pool.query(qRemote, (err, res) => {
        if (err) console.log(err)
        console.timeEnd('100000')
        pool.end()
      })
    
    }
  })
}
console.time('100000')
dataPop()

