const { getModel } = require('../models')

const findAll = () => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.findAll({
                attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] },
                include: [{ all: true, nested: true, attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] } }]
            }))
}

const findById = (id) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.findById(id, {
                attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] },
                include: [{ all: true, nested: true, attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] } }]
            }))
}

const create = (data) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.create(data)
        )
}

const update = (id, data) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.update(data, {
                where: {
                    id: id
                }
            }))
}

const remove = (id) => {
    return getModel('equipment')
        .then(Equipment => 
            Equipment.destroy({
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