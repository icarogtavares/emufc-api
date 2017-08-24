import express from 'express'
import EquipmentsController from '../controllers/equipments'
import db from '../models/'

const router = express.Router();

const equipmentsController = new EquipmentsController(db.equipment, db.place, db.responsible);

router.route('/')
  .get((req, res, next) => equipmentsController.findAll(req, res, next))
  .post((req, res, next) => equipmentsController.save(req, res, next));

router.route('/:id')
  .get((req, res, next) => equipmentsController.findOne(req, res, next))
  .put((req, res, next) => equipmentsController.update(req, res, next))
  .delete((req, res, next) => equipmentsController.delete(req, res, next))
  
export default router;