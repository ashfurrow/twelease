jest.mock('twit')
import * as Twitter from 'twit'

import tweet from "../src/twitter"

it("posts to twitter", () => {
  const post = jest.fn()
  const t: any = Twitter

  t.mockImplementation((a) => ({ post }))

  tweet('hi there')

  expect(post).toHaveBeenCalledWith('statuses/update', { status: 'hi there' }, expect.any(Function))
})
