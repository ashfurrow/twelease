import tweet from "../src/twitter"

let twitMock
let post

beforeEach(() => {
  post = jest.fn()
  twitMock = jest.fn()
})

it("posts to twitter", () => {
  twitMock.post = post

  tweet('hi there', () => twitMock)

  expect(post).toHaveBeenCalledWith('statuses/update', {status: 'hi there'}, expect.any(Function))
})
