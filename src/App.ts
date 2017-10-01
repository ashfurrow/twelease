import * as bodyParser from "body-parser"
import * as express from "express"
import * as logger from "morgan"
import * as path from "path"
import eventHandler from './eventHandler'
import * as GithubWebhook from 'express-github-webhook'

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application
  public webhookHandler: GithubWebhook

  constructor() {
    this.express = express()
    this.webhookHandler = GithubWebhook({ path: process.env.WEBHOOK_ENDPOINT || '/', secret: process.env.WEBHOOK_SECRET_TOKEN })
    this.middleware()
    this.routes()
  }

  private middleware(): void {
    this.express.use(logger("dev"))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(this.webhookHandler)
  }

  private routes(): void {
    this.webhookHandler.on('error', function (err, req, res) {
      console.error(err)
    })
    this.webhookHandler.on('event', eventHandler)
  }
}

export default new App().express
