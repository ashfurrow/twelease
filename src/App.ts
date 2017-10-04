import * as bodyParser from "body-parser"
import * as Express from "express"
import * as logger from "morgan"
import * as path from "path"
import eventHandler from './eventHandler'
import * as GithubWebhook from 'express-github-webhook'

const express = Express()
express.use(logger("dev"))
express.use(bodyParser.json())
express.use(bodyParser.urlencoded({ extended: false }))

const webhookHandler = GithubWebhook({
  path: process.env.WEBHOOK_ENDPOINT || '/',
  secret: process.env.WEBHOOK_SECRET_TOKEN
})

express.use(webhookHandler)

webhookHandler.on('error', (err, req, res) => {
  console.error(err)
})

webhookHandler.on('*', eventHandler)

export default express
