require('dotenv/config');
const express = require('express');
const path = require('path');
const Youch = require('youch');
const cors = require('cors');
require('express-async-errors');


const router = require('./routers');
require('./database');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routers();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use('/files',
      express.static(
        path.resolve(__dirname, '..', 'tmp', 'uploads'),
      ));
  }

  routers() {
    this.server.use(router);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const error = await new Youch(err, req).toJSON();
        return res.status(500).json(error);
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

module.exports = new App().server;
