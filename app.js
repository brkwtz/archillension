const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const axios = require('axios')
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
const server = app.listen(1337, () => {
  console.log('listening on port 1337')
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

app.get('/archillect', (req, res, next) => {
  client.get('statuses/user_timeline', {screen_name: 'archillect'}, (error, tweet, response) => {
    if(error) throw error
    res.send(tweet[0].entities.media[0].media_url)
  })
})

app.get('/', (req, res, next) => {
  res.render('index')
})
