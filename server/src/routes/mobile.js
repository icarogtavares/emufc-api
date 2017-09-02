import express from 'express'
import * as mobileController from '../controllers/mobile'

const router = express.Router();

router.route('/')
    .get(mobileController.findAll);


export default router;