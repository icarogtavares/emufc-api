import express from 'express'
import VersionController from '../controllers/version'
import db from '../models'

const versionController = new VersionController(db.version);
const router = express.Router();

router.route('/')
    .get((req, res, next) => versionController.currentVersion(req, res, next))
    .post((req, res, next) => versionController.incrementVersion(req, res, next)); 


export default router;