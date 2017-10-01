import * as Mustache from 'mustache'
import tweet from './twitter'

const handleNewTag = (tagName: string, pusherName: string, repoURL: string): void => {
  console.log(`${pusherName} pushed new tag ${tagName}`)
  const template = process.env['TWEET_MUSTACHE_TEMPLATE']
  const tweetText = Mustache.render(template, {tagName, pusherName, repoURL})
  tweet(tweetText)
}

const eventHandler = (event, repoName, data) => {
  console.log("Received event", event, repoName)
  if (event === 'create' && data.ref_type === 'tag') {
    const tagName: string = data.ref
    const pusherName: string = data.sender.login
    const repoURL: string = `${data.repository.html_url}`
    handleNewTag(tagName, pusherName, repoURL)
  }
}

export default eventHandler
