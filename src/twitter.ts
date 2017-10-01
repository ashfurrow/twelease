import Twit from 'twit'

const tweet = (tweetText: string) => {
  console.log(`Tweeting '${tweetText}'`)
  const env = process.env
  const t = new Twit({
    consumer_key: env['TWITTER_CONSUMER_KEY'],
    consumer_secret: env['TWITTER_CONSUMER_SECRET'],
    access_token: env['TWITTER_ACCESS_TOKEN'],
    access_token_secret: env['TWITTER_ACCESS_SECRET']
  })
  t.post('statuses/update', { status: tweetText }, (error, data, response) => {
    if (error) {
      console.error('Problem posting to twitter: ', error)
    }
    console.log(data)
  })
}

export default tweet
