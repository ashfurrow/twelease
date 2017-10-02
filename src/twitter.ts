import * as Twit from 'twit'

const defaultTwitFactory = () => new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
})

const tweet = (tweetText: string, twitFactory = defaultTwitFactory) => {
  console.log(`Tweeting '${tweetText}'`)
  const env = process.env
  const t = twitFactory()
  t.post('statuses/update', { status: tweetText }, (error, data, response) => {
    if (error) {
      console.error('Problem posting to twitter: ', error)
    }
    if (data) {
      console.log('Tweeted, id: ', data.id)
    }
  })
}

export default tweet
