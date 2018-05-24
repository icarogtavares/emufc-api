const { getModel } = require('../models')

const findAll = () => getModel('responsible')
  .then(Responsible =>
    Responsible.findAll({
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    }))

const findById = id => getModel('responsible')
  .then(Responsible =>
    Responsible.findById(id, {
      attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
    }))

const create = data => getModel('responsible')
  .then(Responsible =>
    Responsible.create(data))

const update = (id, data) => getModel('responsible')
  .then(Responsible =>
    Responsible.update(data, {
      where: {
        id,
      },
    }))

const remove = id => getModel('responsible')
  .then(Responsible =>
    Responsible.destroy({
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
