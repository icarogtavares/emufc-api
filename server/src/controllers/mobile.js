import { assoc } from 'ramda'
import * as Promise from 'bluebird'
import * as equipmentsService from '../services/equipments'
import * as responsiblesService from '../services/responsibles'
import * as placesService from '../services/places'
import * as versionService from '../services/version'

export const findAll = (req, res, next) => {
    const equipments = equipmentsService.findAll();
    const responsibles = responsiblesService.findAll();
    const places = placesService.findAll();

    versionService.currentVersion()
        .then(version => {
            if(version.current > req.get('VERSION')){
                return Promise.all([equipments, responsibles, places])
            }

            throw new Error('Already up to date.');
        })
        .then(([equipments, responsibles, places]) => res.send({
            equipments: equipments,
            responsibles: responsibles,
            places: places
        }))
        .catch(err => next(assoc('status', 400, err)));
}