import { getModel } from '../models'

export const findAll = () => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.findAll({
                attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] },
                include: [{ all: true, nested: true, attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] } }]
            }))
}

export const findById = (id) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.findById(id, {
                attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] },
                include: [{ all: true, nested: true, attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] } }]
            }))
}

export const create = (data) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.create(data)
        )
}

export const update = (id, data) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.update(data, {
                where: {
                    id: id
                }
            }))
}

export const remove = (id) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.destroy({
                where: {
                    id: id
                }
            }))
}