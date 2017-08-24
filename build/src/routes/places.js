'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _places = require('../controllers/places');

var _places2 = _interopRequireDefault(_places);

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

const placesController = new _places2.default(_models2.default.place);

router.route('/').get((req, res, next) => placesController.findAll(req, res, next)).post((req, res, next) => placesController.save(req, res, next));

router.route('/:id').get((req, res, next) => placesController.findOne(req, res, next)).put((req, res, next) => placesController.update(req, res, next)).delete((req, res, next) => placesController.delete(req, res, next));

exports.default = router;