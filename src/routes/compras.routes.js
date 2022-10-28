import {Router} from 'express';
import {comprasView, comprasRegistrarView, 
        postCompra1, postCompra2, getCompras,
        getComprasId} from '../controllers/compras.controller';

const router = Router();

router.get('/compras', comprasView);

router.get('/compras-registrar', comprasRegistrarView);

router.post('/api/post-compra1', postCompra1);

router.post('/api/post-compra2', postCompra2);

router.get('/api/get-compras', getCompras);

router.get('/api/get-compras/:id', getComprasId);

export default router;