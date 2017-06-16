const consumerKey = require('./secrets').consumerKey
const consumerSecret = require('./secrets').consumerSecret

const getBearerToken = require('get-twitter-bearer-token')

getBearerToken(consumerKey, consumerSecret, (err, res) => {
  if (err) {
    // handle error
  } else {

    // bearer token
    console.log('your token' , res.body.access_token)
  }
})
