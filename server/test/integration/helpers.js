const supertest = require('supertest')
const chai = require('chai')
const { configureExpress } = require('../../src/bin/middlewares')
var app = configureExpress();

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;