import { assoc, equals } from 'ramda'

export default class UsersController {

  constructor(User) {
    this.User = User;
  }

  findAll(req, res, next) {
    this.User.findAll({
      attributes: ['id', 'username', 'email']
    })
      .then(users => res.send(users))
      .catch(err => next(assoc('status', 400, err)));
  }

  save(req, res, next) {
    this.User.create(req.body)
      .then(user => res.status(201).send(user))
      .catch(err => next(assoc('status', 400, err)));
  }

  update(req, res, next) {
    this.User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(rowsAffected => {
        if(equals(rowsAffected, 0)){
          return next();
        }
        res.sendStatus(200);
      })
      .catch(err => next(assoc('status', 400, err)))
  }

}
