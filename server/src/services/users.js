const { getModel } = require('../models')

const findAll = () => getModel('user')
  .then(User =>
    User.findAll({
      attributes: { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] },
    }))

const findById = id => getModel('user')
  .then(User =>
    User.findById(id, {
      attributes: { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] },
    }))

const findByUsername = username => getModel('user')
  .then(User =>
    User.findOne({
      where: {
        username,
      },
    }))

const create = data => getModel('user')
  .then(User =>
    User.create(data))

const update = (id, data) => getModel('user')
  .then(User =>
    User.update(data, {
      where: {
        id,
      },
    }))

const updateToken = (id, token) => getModel('user')
  .then(User =>
    User.update({
      access_token: token,
    }, {
      where: {
        id,
      },
    }))

const remove = id => getModel('user')
  .then(User =>
    User.destroy({
      where: {
        id,
      },
    }))

module.exports = {
  findAll,
  findById,
  findByUsername,
  create,
  update,
  updateToken,
  remove,
}
