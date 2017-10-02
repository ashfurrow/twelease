[![CircleCI](https://circleci.com/gh/ashfurrow/twelease.svg?style=svg)](https://circleci.com/gh/ashfurrow/twelease)

Twelease
========

Twelease is a small Express server that received GitHub webhooks and tweets about new tags pushed to the repo.

Setup
-----

Setup takes about 5 minutes. As the Twitter account you want the tweets to be sent from, you need to [register a new Twitter application](https://apps.twitter.com/app/new) to receive OAuth credentials, as well as generate an access token and secret for your account. With those four tokens in hand, next we'll deploy the server.

I recommend using Heroku. Smash the deploy button!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Note that Heroku creates a `WEBHOOK_SECRET_TOKEN`. Copy that – we'll need it to set up our GitHub webhook. You'll be prompted to enter in the tokens you got from Twitter, too.

For the tweet template, we use Mustache. Make sure to use triple-braces to avoid HTML escaping. There's a default provided for you.

Got to the Settings page for whatever repo you want to add this integration to. Select the "Webhooks" section and click "Add Webhook". *Important*: for content type, select `application/json`. Paste in the secret from Heroku, as well as the Heroku URL. 

![Webhook settings](docs/webhook_settings.png)

Select "Let me select individual events" and select only the "create" event.

![Webhook settings](docs/webhook_events.png)

Finally, hit the green "Add webhook" button at the bottom of the screen.

Developing
----------

This is a NodeJS Express server written in Typescript.
