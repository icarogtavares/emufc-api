import { getModel } from '../models'

export const findAll = () => {
    return getModel('place')
      .then(Place => 
        Place.findAll({
          attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at']}
        }))
}

export const findById = (id) => {
  return getModel('place')
    .then(Place => 
      Place.findById(id, {
        attributes : { exclude: ['created_at', 'updated_at', 'deleted_at'] }
      }))
}

export const create = (data) => {
  return getModel('place')
  .then(Place => 
    Place.create(data)
  )
}

export const update = (id, data) => {
  return getModel('place')
    .then(Place => 
      Place.update(data, {
      where: {
        id: id
      }
    }))
}

export const remove = (id) => {
  return getModel('place')
    .then(Place => 
      Place.destroy({
      where: {
        id: id
      }
    }))
}