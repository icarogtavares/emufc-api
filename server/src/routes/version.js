import express from 'express'
import * as versionController from '../controllers/version'

const router = express.Router();

router.route('/')
    .get(versionController.currentVersion)
    .post(versionController.incrementVersion);


export default router;