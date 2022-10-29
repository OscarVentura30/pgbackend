import {Router} from 'express';

import {ventasView, getVentas, getVentaId, getVenta1} from '../controllers/ventas.controller';

const router = Router();

//Vista

router.get('/ventas', ventasView);

router.get('/api/get-ventas', getVentas);

router.get('/api/get-ventas/:id', getVentaId);

router.get('/api/get-venta1/:id', getVenta1);


export default router;