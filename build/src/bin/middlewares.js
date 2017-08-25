'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureExpress = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('../routes/');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configureExpress = exports.configureExpress = () => {
  var app = (0, _express2.default)();

  app.set('port', process.env.PORT || '3000');

  if (app.get('env') === 'production') {
    app.use((0, _morgan2.default)('common'));
  } else if (app.get('env') === 'development') {
    app.use((0, _morgan2.default)('dev'));
  }

  app.use((0, _helmet2.default)());
  app.use(_helmet2.default.noCache());
  app.use((0, _cors2.default)());
  app.use((0, _compression2.default)());
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use((0, _cookieParser2.default)());

  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });

  app.use('/', _routes2.default);

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
};