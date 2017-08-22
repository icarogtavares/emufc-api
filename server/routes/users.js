import express from 'express'
import UsersController from '../controllers/users'
import db from '../models/'

const router = express.Router();

const usersController = new UsersController(db.user);

router.route('/')
  .get((req, res, next) => usersController.getAll(req, res, next))
  .post((req, res, next) => usersController.save(req, res, next));

router.route('/:id')
  .put((req, res, next) => usersController.update(req, res, next))
  
export default router;