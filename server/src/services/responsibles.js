import { getModel } from '../models'

export const findAll = () => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.findAll({
                attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at']}
        }))
}

export const findById = (id) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.findById(id, {
                attributes : { exclude: ['created_at', 'updated_at', 'deleted_at'] }
            }))
}

export const create = (data) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.create(data)
        )
}

export const update = (id, data) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.update(data, {
                where: {
                    id: id
                }
            }))
}

export const remove = (id) => {
    return getModel('responsible')
        .then(Responsible => 
            Responsible.destroy({
                where: {
                    id: id
                }
            }))
}