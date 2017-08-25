import express from 'express'
import MobileController from '../controllers/mobile'
import db from '../models'

const mobileController = new MobileController(db.version, db.equipment, db.place, db.responsible);
const router = express.Router();

router.route('/')
    .get((req, res, next) => mobileController.findAll(req, res, next));


export default router;