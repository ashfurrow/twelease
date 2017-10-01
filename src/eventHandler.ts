import * as Mustache from 'mustache'

const handleNewTag = (tagName: string, pusherName: string): void => {
  console.log(`${pusherName} pushed new tag ${tagName}`)
  const template = process.env['TWEET_MUSTACHE_TEMPLATE']
  const tweetText = Mustache.render(template, {tagName, pusherName})
  console.log(`TweetTexting '${tweetText}'`)
}

const eventHandler = (event, repoName, data) => {
  console.log("Received event", event, repoName)
  if (event === 'create' && data.ref_type === 'tag') {
    const tagName: string = data.ref
    const pusherName: string = data.sender.login
    handleNewTag(tagName, pusherName)
  }
}

export default eventHandler
