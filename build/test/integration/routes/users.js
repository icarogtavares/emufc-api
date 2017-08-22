'use strict';

var _models = require('../../../models');

var _models2 = _interopRequireDefault(_models);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { user: User } = _models2.default;

describe('Routes: User', () => {

    const fakeUser = {
        username: "icaropinho",
        email: "icaropinhoe@gmail.com",
        password: "123456",
        access_token: "asdasdad"
    };

    const fakeUserWithInvalidEmail = {
        username: "josiaswando",
        email: "josias",
        password: "123456",
        access_token: "asdasdad"
    };

    const fakeUsers = [{
        username: "icarotavares",
        email: "icarotavares@live.com",
        password: "123456",
        access_token: "asdasdad"
    }, {
        username: "andersonalmada",
        email: "almada@gmail.com",
        password: "123456",
        access_token: "asdasdad"
    }];

    beforeEach(done => {
        User.sync({ force: true }).then(() => User.bulkCreate(fakeUsers)).then(users => {
            done();
        }).catch(err => {
            done(err);
        });
    });

    describe('# GET /users', () => {
        it('return a list of users', done => {
            request.get("/users").expect(200).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body).to.have.length(2);
                expect(res.body[0].username).to.eql("icarotavares");
                expect(res.body[1].username).to.eql("andersonalmada");
                done(err);
            });
        });
    });

    describe('# POST /users', () => {
        it('should create a new user', done => {
            request.post('/users').send(fakeUser).expect(201).expect('Content-Type', /json/).end((err, res) => {
                expect(res.body.username).to.eql(fakeUser.username);
                expect(res.body.email).to.eql(fakeUser.email);
                done(err);
            });
        });

        it('shouldnt create a new user with invalid email', done => {
            request.post('/users').send(fakeUserWithInvalidEmail).expect(400, done);
        });

        it('shouldnt create a new user with duplicated email', done => {
            request.post('/users').send(fakeUsers[0]).expect(400, done);
        });

        it('shouldnt create a new user without email', done => {
            request.post('/users').send((0, _ramda.dissoc)('email', fakeUser)).expect(400, done);
        });
    });

    describe('# PUT /users/{id}', () => {
        it('should update a user', done => {
            request.put('/users').send(fakeUser).expect(200, done);
        });
    });
});