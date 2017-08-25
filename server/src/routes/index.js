import express from 'express'
import usersRoutes from './users'
import placesRoutes from './places'
import responsiblesRoutes from './responsibles'
import equipmentsRoutes from './equipments'
import loginRoutes from './login'
import versionRoutes from './version'

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/places', placesRoutes);
router.use('/responsibles', responsiblesRoutes);
router.use('/equipments', equipmentsRoutes);
router.use('/login', loginRoutes);
router.use('/version', versionRoutes);

router.get('/', (req, res, next) => {
  res.send({index : 'index route'});
});

export default router;
