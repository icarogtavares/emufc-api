import express from 'express'
import PlacesController from '../controllers/places'
import db from '../models/'

const router = express.Router();

const placesController = new PlacesController(db.place);

router.route('/')
  .get((req, res, next) => placesController.getAll(req, res, next))
  .post((req, res, next) => placesController.save(req, res, next));

router.route('/:id')
  .put((req, res, next) => placesController.update(req, res, next))
  
export default router;