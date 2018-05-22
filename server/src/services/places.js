const { getModel } = require('../models')

const findAll = () => {
    return getModel('place')
      .then(Place => 
        Place.findAll({
          attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at']}
        }))
}

const findById = (id) => {
  return getModel('place')
    .then(Place => 
      Place.findById(id, {
        attributes : { exclude: ['created_at', 'updated_at', 'deleted_at'] }
      }))
}

const create = (data) => {
  return getModel('place')
    .then(Place => 
      Place.create(data)
    )
}

const update = (id, data) => {
  return getModel('place')
    .then(Place => 
      Place.update(data, {
      where: {
        id: id
      }
    }))
}

const remove = (id) => {
  return getModel('place')
    .then(Place => 
      Place.destroy({
      where: {
        id: id
      }
    }))
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}