import express from 'express';
import inmuebles from './inmueblesRoutes'
const router = express.Router();

router.use('/inmuebles', inmuebles);
export default router;