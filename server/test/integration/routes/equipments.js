import db from '../../../src/models'
import { empty, assoc, toString } from 'ramda'
import * as Promise from 'bluebird'
const {responsible: Responsible, place: Place, equipment: Equipment} = db;

describe('Routes: Equipment', () => {

    const fakePlace = {
        name: "Departamento da Computação",
        latitude: -3.747014,
        longitude: -38.576372
    };

    const fakeResponsible = {
        name: "João de Sousa Neto",
        email: "joao@gmail.com",
        phone: "+55 85 9 9999-9999"
    };

    const fakeEquipment = {
        name: "Microscópio confocal - LM 710 Zeiss",
        description: "Possui 6 linhas de lasers. Gera imagens tridimensionais com alto contraste e\nespecificidade de sinal.",
        place_id: 1,
        responsible_id: 1
    };

    const fakeEquipments = [
        {
            name: "Witec alpha300",
            description: "Imagens Raman confocal\nResolução nominal de 200-300nm\nResolução 3D excepcional\nImagens Raman ultra-rápidas (0.76ms)",
            place_id: 1,
            responsible_id: 1
        },
        {
            name: "MEV Inspect S50 - FEI",
            description: "Resolução nominal de 3nm\nAnálise de superfícies de materiais em alto e baixo vácuo\nEDS e Litografia de elétrons",
            place_id: 1,
            responsible_id: 1
        }
    ]

    const syncPlaces = Place.sync({force: true})
        .then(() => Place.create(fakePlace))

    const syncResponsibles =  Responsible.sync({force: true})
        .then(() => Responsible.create(fakeResponsible))

    before(done => {
        Equipment.drop()
        .then(() => Promise.all([syncPlaces, syncResponsibles]))
        .then(() => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    beforeEach(done => {
        Equipment.sync({force: true})
            .then(() => Equipment.bulkCreate(fakeEquipments))
            .then(equipments => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    describe('# GET /equipments', () => {
        it('should return a list of equipments', done => {
            request.get("/equipments")
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    console.log(JSON.stringify(res.body, null, 2));
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].name).to.eql(fakeEquipments[0].name);
                    expect(res.body[0].description).to.eql(fakeEquipments[0].description);
                    expect(res.body[0]).to.not.have.property('created_at');
                    expect(res.body[0]).to.not.have.property('updated_at');
                    expect(res.body[0]).to.not.have.property('deleted_at');
                    expect(res.body[1].name).to.eql(fakeEquipments[1].name);
                    expect(res.body[1].description).to.eql(fakeEquipments[1].description);
                    done(err);
                });
        })
    });
});