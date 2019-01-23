
const {
  pool
} = require('../db/config.js');
const {
  redisClient
} = require('../db/config.js')

module.exports = {
  getOne: (req, res) => {
    let {
      id
    } = req.params;
    redisClient.get(id.toString(), (err, result) => {
      if (result !== null) {
        res.send(JSON.parse(result))
      } else {
        pool.query(`select * from moviestable where id=${id};`)
          .then(data => {
            let flatData = data.rows[0];
            let dataObj = [{
              'id': id,
              'video': {
                'title': flatData.title,
                'year': flatData.year,
                'video': flatData.video,
              },
              'poster': {
                'image': flatData.image,
              },
              'score': {
                'all_critics': {
                  'tomatometer': flatData.ac_tomatometer,
                  'average_rating': flatData.ac_average_rating,
                  'reviews_counted': flatData.ac_reviews_counted,
                  'fresh': flatData.ac_fresh,
                  'rotten': flatData.ac_rotten
                },
                'consensus': flatData.consensus,
                'audience': {
                  'audience_score': flatData.audience_score,
                  'average_rating': flatData.aud_average_rating,
                  'user_ratings': flatData.user_ratings
                },
                'top_critics': {
                  'tomatometer': flatData.tc_tomatometer,
                  'average_rating': flatData.tc_average_rating,
                  'reviews_counted': flatData.tc_reviews_counted,
                  'fresh': flatData.tc_fresh,
                  'rotten': flatData.tc_rotten
                }

              }

            }]
            redisClient.set(dataObj[0].id.toString(), JSON.stringify(dataObj), 'EX', 60 * 60 * 4, (err, response) => {
              if (err) console.log(err)
            })
            res.send(dataObj)
          })
          .catch(err => {
            console.log(err)
            res.sendStatus(500)
          })
      }
    })

  }
}