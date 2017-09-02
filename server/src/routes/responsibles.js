import express from 'express'
import * as responsiblesController from '../controllers/responsibles'

const router = express.Router();

router.route('/')
    .get(responsiblesController.findAll)
    .post(responsiblesController.save);

router.route('/:id')
    .get(responsiblesController.findOne)
    .put(responsiblesController.update)
    .delete(responsiblesController.remove);


export default router;