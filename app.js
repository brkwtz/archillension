const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const Twitter = require('twitter')
const consumerKey = require('./secrets').consumerKey
const consumerSecret = require('./secrets').consumerSecret
const bearerToken = require('./secrets').bearerToken

//middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

// rendering setup
nunjucks.configure('views', {noCache: true})
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'html')
app.engine('html', nunjucks.render)

//listen
const server = app.listen(3000, () => {
  console.log('listening on port 3000')
})

//twitter
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  bearer_token: bearerToken
})

app.get('/twitterhookedup', (req, res, next) => {
  if(client) res.send('all good')
  if(!client) res.send('try again buckaroo')
})

function processTwitterResponse(tweet) {
  let tweets = []
  for(let i = 0; i < 3; i++) {
    let responseObject = {}
    if (tweet[i].extended_entities.media[0].type === 'photo') {
      responseObject.type = 'image'
      responseObject.url = tweet[i].entities.media[0].media_url
    } else if (tweet[i].extended_entities.media[0].type === 'animated_gif') {
      responseObject.type = 'video'
      responseObject.url = tweet[i].extended_entities.media[0].video_info.variants[0].url
    }
    tweets.push(responseObject)
  }
  return tweets
}

app.get('/archillect', (req, res, next) => {
  client.get('statuses/user_timeline', {screen_name: 'archillect'}, (error, tweet, response) => {
    if(error) throw error
    const tweets = processTwitterResponse(tweet)
    res.send(tweets)
  })
})

app.get('/', (req, res, next) => {
  res.render('index')
})
