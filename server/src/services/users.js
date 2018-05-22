const { getModel } = require('../models')

const findAll = () => {
    return getModel('user')
        .then(User => 
            User.findAll({
                attributes:{ exclude: ['password', 'created_at', 'updated_at', 'deleted_at']}
        }))
}

const findById = (id) => {
    return getModel('user')
        .then(User => 
            User.findById(id, {
                attributes : { exclude: ['password', 'created_at', 'updated_at', 'deleted_at'] }
            }))
}

const findByUsername = (username) => {
    return getModel('user')
        .then(User => 
            User.findOne({
                where: {
                  username: username
                }
            }))
}

const create = (data) => {
    return getModel('user')
        .then(User => 
            User.create(data)
        )
}

const update = (id, data) => {
    return getModel('user')
        .then(User => 
            User.update(data, {
                where: {
                    id: id
                }
            }))
}

const updateToken = (id, token) => {
    return getModel('user')
        .then(User =>
            User.update({
                access_token: token
            }, {
                where : {
                    id : id
                }
            }))
}

const remove = (id) => {
    return getModel('user')
        .then(User => 
            User.destroy({
                where: {
                    id: id
                }
            }))
}

module.exports = {
    findAll,
    findById,
    findByUsername,
    create,
    update,
    updateToken,
    remove,
}