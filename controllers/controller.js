// const Movie = require("../models/Movie.js");

const pool = require('../db/config.js');

module.exports = {
  getOne : (req,res) => {
    let {id} = req.params;
    pool.query(`select * from moviestable where id=${id};`)
    .then(data => {
      let flatData = data.rows[0];
      let dataObj = [{
          'id' : id,
          'video' : {
            'title' : flatData.title,
            'year' : flatData.year,
            'video' : flatData.video,
          },
          'poster' : {
            'image' : flatData.image,
          },
          'score' : {
            'all_critics': {
              'tomatometer' : flatData.ac_tomatometer,
              'average_rating': flatData.ac_average_rating,
              'reviews_counted' : flatData.ac_reviews_counted,
              'fresh' : flatData.ac_fresh,
              'rotten' : flatData.ac_rotten
            },
            'consensus' : flatData.consensus,
            'audience' : {
              'audience_score': flatData.audience_score,
              'average_rating' : flatData.aud_average_rating,
              'user_ratings' : flatData.user_ratings
            },
            'top_critics' : {
              'tomatometer': flatData.tc_tomatometer,
              'average_rating' : flatData.tc_average_rating,
              'reviews_counted' : flatData.tc_reviews_counted,
              'fresh' : flatData.tc_fresh,
              'rotten' : flatData.tc_rotten
            }
    
        }
  
    }]
    res.send(dataObj)
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
  }
}

// module.exports = {
//   getOne: (req, res) => {
//     let { id } = req.params;
//     Movie.find({ id: id })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.send(500);
//       });
//   }
// }
