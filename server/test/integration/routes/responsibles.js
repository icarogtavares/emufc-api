import db from '../../../models'
const {responsible: Responsible, equipment: Equipment} = db;

describe('Routes: Responsible', () => {

    const fakeResponsible = {
        name: "João de Sousa Neto",
        email: "joao@gmail.com",
        phone: "+55 85 9 9999-9999"
    };

    const fakeResponsibles = [
        {
            name: "Maria de Oliveira",
            email: "maria@hotmail.com",
            phone: "+55 85 999999999"
        },
        {
            name: "Raimundo da Silva",
            email: "raimundo@yahoo.com.br",
            phone: "+55 85999999999"
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
        Responsible.sync({force: true})
            .then(() => Responsible.bulkCreate(fakeResponsibles))
            .then(responsibles => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    describe('# GET /responsibles', () => {
        it('return a list of responsibles', done => {
            request.get("/responsibles")
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].name).to.eql(fakeResponsibles[0].name);
                    expect(res.body[0].email).to.eql(fakeResponsibles[0].email);
                    expect(res.body[0].phone).to.eql(fakeResponsibles[0].phone);
                    expect(res.body[0]).to.not.have.property('created_at');
                    expect(res.body[0]).to.not.have.property('updated_at');
                    expect(res.body[0]).to.not.have.property('deleted_at');

                    expect(res.body[1].name).to.eql(fakeResponsibles[1].name);
                    expect(res.body[1].email).to.eql(fakeResponsibles[1].email);
                    expect(res.body[1].phone).to.eql(fakeResponsibles[1].phone);
                    done(err);
                });
        });
    });

});