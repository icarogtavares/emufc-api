import express from 'express'
import ResponsiblesController from '../controllers/responsibles'
import db from '../models'

const responsiblesController = new ResponsiblesController(db.responsible);
const router = express.Router();

router.route('/')
    .get((req, res, next) => responsiblesController.getAll(req, res, next));


export default router;