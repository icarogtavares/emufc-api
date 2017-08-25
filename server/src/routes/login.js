import express from 'express'
import UsersController from '../controllers/users'
import db from '../models/'
import auth from '../bin/auth'

const router = express.Router();

const usersController = new UsersController(db.user);

router.route('/')
  .post((req, res, next) => usersController.login(req, res, next));
  
router.route('/')
  .get(auth().authenticate(), (req, res, next) => res.send('Auth test OK!'))

export default router;