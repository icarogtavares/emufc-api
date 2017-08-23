import express from 'express'
import ResponsiblesController from '../controllers/responsibles'
import db from '../models'

const responsiblesController = new ResponsiblesController(db.responsible);
const router = express.Router();

router.route('/')
    .get((req, res, next) => responsiblesController.getAll(req, res, next))
    .post((req, res, next) => responsiblesController.save(req, res, next));

router.route('/:id')
    .put((req, res, next) => responsiblesController.update(req, res, next));


export default router;