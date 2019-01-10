const faker = require('faker')
const youTubeVids = require('./youTubeLinks.js')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/movies";
var client  = new MongoClient(url)
const connection = client.connect()




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
      '_id' : idCounter,
      'id' : idCounter,
      'video' : {
        'title' : faker.lorem.words(getRandomIntInclusive(1,3)),
        'year' : getRandomIntInclusive(1900,2019),
        'video' : youTubeVids[getRandomIntInclusive(0,99)],
      },
      'poster' : {
        'image' : `https://s3.amazonaws.com/bad-apples-images/movie-posters/${randomImage}.jpg`,
      },
      'score' : {
        'all_critics': {
          'tomatometer' : getRandomIntInclusive(0,100),
          'average_rating': Number(getRandomArbitrary(0,10).toFixed(1)),
          'reviews_counted' : all_criits_total,
          'fresh' : all_critics_fresh,
          'rotten' : all_critics_rotten
        },
        'consensus' : faker.lorem.sentences(3),
        'audience' : {
          'audience score': getRandomIntInclusive(0,100),
          'average_rating' : Number(getRandomArbitrary(0,5).toFixed(1)),
          'user_ratings' : getRandomIntInclusive(0,10000)
        },
        'top_critics' : {
          'tomatometer': getRandomIntInclusive(0,100),
          'average_rating' : Number(getRandomArbitrary(0,10).toFixed(1)),
          'reviews_counted' : top_criits_total,
          'fresh' : top_critics_fresh,
          'rotten' : top_critics_rotten
        }
      },
      
  
    }
    idCounter += 1
    dataCol.push(dataObj)
  }
  return dataCol

}


const connect = connection

connect.then(() => {
  console.time('end')
  function insertData() {
    const doc = generateData(100000)
    const db = client.db('movie')
    const coll = db.collection('movies')
    coll.insertMany(doc, (err, result) => {
      if (err) {
        throw err;
      }
      if (idCounter < 10000000) {
        insertData()
      } else {
        console.timeEnd('end')
      }
    })
  }
  insertData()
})