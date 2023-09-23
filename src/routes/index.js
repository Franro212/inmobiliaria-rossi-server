import express from 'express';
import inmuebles from './inmueblesRoutes'
import admins from './userRoutes'
import email from './emailRoutes'
const router = express.Router();

router.use('/inmuebles', inmuebles);
router.use('/user', admins);
router.use('/email', email)
export default router;