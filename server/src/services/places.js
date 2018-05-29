const { getModel } = require('../models')

const findAll = () => getModel('place')
  .then(Place =>
    Place.findAll({
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    }))

const findById = id => getModel('place')
  .then(Place =>
    Place.findById(id, {
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    }))

const create = data => getModel('place')
  .then(Place =>
    Place.create(data))

const update = (id, data) => getModel('place')
  .then(Place =>
    Place.update(data, {
      where: {
        id,
      },
    }))

const remove = id => getModel('place')
  .then(Place =>
    Place.destroy({
      where: {
        id,
      },
    }))

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
}
