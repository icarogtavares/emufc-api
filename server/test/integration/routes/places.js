import db from '../../../models'
import { dissoc, empty, assoc, toString } from 'ramda'
const {place: Place, equipment: Equipment} = db;

describe('Routes: Place', () => {

    const fakePlace = {
        name: "Departamento da Computação",
        latitude: -3.747014,
        longitude: -38.576372
    };

    const fakePlaces = [
        {
            name: "Departamento de Física - Bloco 929",
            latitude: -3.747014,
            longitude: -38.576372
        },
        {
            name: "Departamento de Física - Bloco 929",
            latitude: -3.747052,
            longitude: -38.5766
        }
    ]

    before(done => {
        Equipment.drop()
            .then(() => done())
            .catch(err => {
                done(err);
            });
    });

    beforeEach(done => {
        Place.sync({force: true})
            .then(() => Place.bulkCreate(fakePlaces))
            .then(places => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    describe('# GET /places', () => {
        it('return a list of places', done => {
            request.get("/places")
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].name).to.eql(fakePlaces[0].name);
                    expect(res.body[0].latitude).to.eql(toString(fakePlaces[0].latitude));
                    expect(res.body[0].longitude).to.eql(toString(fakePlaces[0].longitude));
                    expect(res.body[0]).to.not.have.property('created_at');
                    expect(res.body[0]).to.not.have.property('updated_at');
                    expect(res.body[0]).to.not.have.property('deleted_at');

                    expect(res.body[1].name).to.eql(fakePlaces[1].name);
                    expect(res.body[1].latitude).to.eql(toString(fakePlaces[1].latitude));
                    expect(res.body[1].longitude).to.include(toString(fakePlaces[1].longitude));
                    done(err);
                });
        })
    });

    describe('# POST /places', () => {
        it('should create a new place', done => {
            request.post('/places')
                .send(fakePlace)
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body.name).to.eql(fakePlace.name);
                    expect(res.body.latitude).to.eql(fakePlace.latitude);
                    expect(res.body.longitude).to.eql(fakePlace.longitude);
                    done(err);
                });
        });

        it("shouldn't create a new place with empty name", done => {
            request.post('/places')
                .send(assoc('name', empty(fakePlace.name), fakePlace))
                .expect(400, done);
        });

        it("shouldn't create a new place with empty latitude", done => {
            request.post('/places')
                .send(assoc('longitude', empty(fakePlace.latitude), fakePlace))
                .expect(400, done);
        });

        it("shouldn't create a new place with empty longitude", done => {
            request.post('/places')
                .send(assoc('longitude', empty(fakePlace.longitude), fakePlace))
                .expect(400, done);
        });

    });

    describe('# PUT /places/{id}', () => {
        it('should update a place', done => {
            request.put('/places/1')
                .send(fakePlace)
                .expect(200)
                .expect('Content-Type', /json/, done);
        });

        it("shouldn't update with empty name", done => {
            request.put('/places/1')
                .send(assoc('name', empty(fakePlace.name), fakePlace))
                .expect(400, done);
        });

        it("shouldn't update with null latitude", done => {
            request.put('/places/1')
                .send(assoc('longitude', null, fakePlace))
                .expect(400, done);
        });

        it("shouldn't update with null longitude", done => {
            request.put('/places/1')
                .send(assoc('longitude', null, fakePlace))
                .expect(400, done);
        });
    });

    describe('# DELETE /places/{id}', () => {
        it('should delete a place', done => {
            request.delete('/places/1')
                .expect(204, done);
        });

        it("shouldn't delete a place that does not exist", done => {
            request.delete('/places/3')
                .expect(404, done);
        });
    });
});