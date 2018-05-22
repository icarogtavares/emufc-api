const { getModel } = require('../models')

const findAll = () => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.findAll({
                attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at']}
        }))
}

const findById = (id) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.findById(id, {
                attributes : { exclude: ['created_at', 'updated_at', 'deleted_at'] }
            }))
}

const create = (data) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.create(data)
        )
}

const update = (id, data) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.update(data, {
                where: {
                    id: id
                }
            }))
}

const remove = (id) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.destroy({
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