import {Router} from 'express';

import {facturaView, facturaGView} from '../controllers/factura.controller';

const router = Router();

router.get('/factura', facturaView);

router.get('/factura-generar/:id', facturaGView)

export default router;