import {Router} from 'express';

import {ventasView, getVentas, getVentaId} from '../controllers/ventas.controller';

const router = Router();

//Vista

router.get('/ventas', ventasView);

router.get('/api/get-ventas', getVentas);

router.get('/api/get-ventas/:id', getVentaId)



export default router;