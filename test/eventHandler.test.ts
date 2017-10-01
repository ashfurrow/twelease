jest.mock('../src/twitter.ts', () => ({default: () => {}}))
import eventHandler from '../src/eventHandler'

beforeAll(() => {
  process.env.TWEET_MUSTACHE_TEMPLATE = "{{{pusherName}}} just released {{{tagName}}} of {{{repoName}}}! {{{repoURL}}}/releases/tag/{{{tagName}}}"
})

it('invokes tweet', () => {
  const tweet = jest.fn()
  eventHandler(tweet)('create', 'test-repo', {
    ref: '0.0.1',
    ref_type: 'tag',
    sender: {
      login: 'username'
    },
    repository: {
      name: 'test-repo',
      html_url: 'http://github.com/username/test-repo'
    }
  })
  expect(tweet).toHaveBeenCalledWith('username just released 0.0.1 of test-repo! http://github.com/username/test-repo/releases/tag/0.0.1')
})

it('does not invoke tweet with non-create event', () => {
  const tweet = jest.fn()
  eventHandler(tweet)('push', 'test-repo', {
    ref: '0.0.1',
    ref_type: 'tag',
    sender: {
      login: 'username'
    },
    repository: {
      name: 'test-repo',
      html_url: 'http://github.com/username/test-repo'
    }
  })
  expect(tweet).not.toHaveBeenCalled()
})

it('does not invoke tweet with a branch creation even', () => {
  const tweet = jest.fn()
  eventHandler(tweet)('create', 'test-repo', {
    ref: 'feature-branch',
    ref_type: 'branch',
    sender: {
      login: 'username'
    },
    repository: {
      name: 'test-repo',
      html_url: 'http://github.com/username/test-repo'
    }
  })
  expect(tweet).not.toHaveBeenCalled()
})
