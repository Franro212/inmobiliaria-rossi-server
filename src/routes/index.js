import express from 'express';
import inmuebles from './inmueblesRoutes'
import admins from './userRoutes'
const router = express.Router();

router.use('/inmuebles', inmuebles);
router.use('/user', admins);
export default router;