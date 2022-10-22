import {Router} from 'express';

import {cajaView, postVenta1, postVenta2} from '../controllers/caja.controller';

const router = Router();

//Vista

router.get('/caja', cajaView);

router.post ('/api/post-caja1', postVenta1);

router.post('/api/post-caja2', postVenta2);


export default router;