import * as Mustache from 'mustache'
import tweet from './twitter'

const handleNewTag = (repoName: string, tagName: string, pusherName: string, repoURL: string): void => {
  console.log(`${pusherName} pushed new tag ${tagName}`)
  const template = process.env['TWEET_MUSTACHE_TEMPLATE']
  const tweetText = Mustache.render(template, {repoName, tagName, pusherName, repoURL})
  tweet(tweetText)
}

const eventHandler = (event, repoName, data) => {
  console.log("Received event", event, )
  if (event === 'create' && data.ref_type === 'tag') {
    const tagName: string = data.ref
    const pusherName: string = data.sender.login
    console.log("repo", data.repository)
    const repoURL: string = `${data.repository.html_url}`
    handleNewTag(repoName, tagName, pusherName, repoURL)
  }
}

export default eventHandler
