import express from 'express'
import * as placeController from '../controllers/places'

const router = express.Router();

router.route('/')
  .get(placeController.findAll)
  .post(placeController.save);

router.route('/:id')
  .get(placeController.findById)
  .put(placeController.update)
  .delete(placeController.remove)
  
export default router;