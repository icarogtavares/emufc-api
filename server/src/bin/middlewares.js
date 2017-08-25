import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import express from 'express'

import routes from '../routes/'

export const configureExpress = () => {
  var app = express();

  app.set('port', process.env.PORT || '3000');

  if (app.get('env') === 'production') {
    app.use(logger('common'));
  } else if (app.get('env') === 'development') {
    app.use(logger('dev'));
  }

  app.use(helmet());
  app.use(helmet.noCache());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    delete req.body.id;
    delete req.body.created_at
    delete req.body.updated_at;
    delete req.body.deleted_at;
    next();
  });

  app.use('/', routes);

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send(res.locals.error);
  });

  return app;
}