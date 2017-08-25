'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _ramda = require('ramda');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _auth = require('../config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _database = require('./config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { user: User } = _models2.default;

var params = {
	secretOrKey: _auth2.default.security.jwtSecret,
	jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader()
};

exports.default = () => {

	var strategy = new _passportJwt.Strategy(params, (payload, done) => {
		User.findById(payload.id).then(user => {
			if ((0, _ramda.isNil)(user)) return done(new Error("User not found"), false);

			const userToken = _jsonwebtoken2.default.decode(user.access_token);

			if ((0, _ramda.eqProps)('id', userToken, payload) && (0, _ramda.eqProps)('iat', userToken, payload) && (0, _ramda.eqProps)('exp', userToken, payload)) {
				return done(null, user);
			}

			return done(new Error("User or token invalid"), false);
		}).catch(err => done(err), false);
	});

	_passport2.default.use(strategy);

	return {
		initialize: () => {
			return _passport2.default.initialize();
		},
		authenticate: () => {
			return _passport2.default.authenticate("jwt", _auth2.default.security.jwtSession);
		}
	};
};