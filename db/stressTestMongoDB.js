var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/movies";
var client  = new MongoClient(url, { useNewUrlParser: true, poolSize : 20 })
const connection = client.connect()

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


const connect = connection

let counter = 0

const stressTest = () => {
  connect.then(() => {
    const db = client.db('movie')
    const coll = db.collection('movies')
    for (var i = 0; i < 10000; i++) {
      let randomRecord = getRandomIntInclusive(101,10000100)
      coll.findOne({_id: randomRecord})
      .then(() => {
        counter += 1;
        if (counter > 9999) {
          console.timeEnd('9999')
          client.close()
          .then((res) => {
            console.log('db closed')
          })
          .catch((err) => {
            console.log(err)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      
    } 
    

  })

}

console.time('9999')
stressTest()

