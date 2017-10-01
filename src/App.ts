import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    const router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    })
    router.post(process.env.WEBHOOK_ENDPOINT, (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    })
    this.express.use('/', router)
  }

}

export default new App().express;
