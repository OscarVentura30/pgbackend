import {Router} from 'express';
import {inventarioView, productoView, productoNewView, typoProductView,
        packProductView, marcaProductView,ProveedorView, ProveedorTypeView,
        PresentProductView,PreciosView,ProductoProveedorView} from '../controllers/inventario.controller';
import {getMarca,postMarca, putMarca, deleteMarca, getMarcaId} from '../controllers/inventario.marca.controller';
import {getTipo, getTipoId, postTipo, putTipo, deleteTipo} from '../controllers/inventario.tipo.controller';
import {getPresent, getPresentId, postPresent, putPresent, deletePresent} from '../controllers/inventario.present.controller';
import {getFullProductos, getFullProductosId, postFullProductos, 
        putProducto,deleteProducto, getDetailsProductosId,
        putProductoDetails, getProductos} from '../controllers/inventario.producto.controller';

import {getUnidad, getUnidadId,postUnidad,
        putUnidad, deleteUnidad} from '../controllers/inventario.unidad.controller';

import {getPrecios, getPreciosId, postPrecio, putPrecio, deletePrecio} from '../controllers/inventario.precio.controller';

import {getProveedorTipo, getProveedorTipoId, postProveedorTipo,
        putProveedorTipo, deleteProveedorTipo} from '../controllers/inventario.proveedor.tipo';

import {getproveedor, getProveedorId, postproveedor, 
        putproveedor, deleteproveedor} from '../controllers/inventario.proveedor';

import {getProdProv, getProdProvId, getProdProvTableId,
        postProdProv, putProdProv, deleteProdProv} from '../controllers/inventario.proveedor.pro';


const router = Router();

// Vistas 

router.get('/inventario', inventarioView);

router.get('/producto', productoView);

router.get('/producto-nuevo', productoNewView);

router.get('/producto-tipo', typoProductView);

router.get('/producto-unidades', packProductView);

router.get('/producto-marca', marcaProductView);

router.get('/producto-presentacion', PresentProductView);

router.get('/producto-proveedor', ProveedorView);

router.get('/producto-proveedor-tipo', ProveedorTypeView);

router.get('/producto-precio', PreciosView);

router.get('/proveedor-producto', ProductoProveedorView);



// Marca CRUD

router.get('/api/get-marcas', getMarca);

router.get('/api/get-marcas/:id', getMarcaId);

router.post('/api/post-marcas', postMarca);

router.put('/api/put-marcas/:id', putMarca);

router.delete('/api/delete-marca/:id', deleteMarca);


// Clasificacion CRUD

router.get('/api/get-tipo', getTipo);

router.get('/api/get-tipo/:id', getTipoId);

router.post('/api/post-tipo', postTipo);

router.put('/api/put-tipo/:id', putTipo);

router.delete('/api/delete-tipo/:id', deleteTipo);


// PRESENTACION DE PRODUCTOS

router.get('/api/get-present', getPresent);

router.get('/api/get-present/:id', getPresentId);

router.post('/api/post-present', postPresent);

router.put('/api/put-present/:id', putPresent);

router.delete('/api/delete-present/:id', deletePresent);


// UNIDADES DE PRODUCTOS

router.get('/api/get-unidades', getUnidad);

router.get('/api/get-unidades/:id', getUnidadId);

router.post('/api/post-unidades', postUnidad);

router.put('/api/put-unidades/:id', putUnidad);

router.delete('/api/delete-unidades/:id', deleteUnidad);

//PROVEEDORES TIPO

router.get('/api/get-proveedor-tipo', getProveedorTipo);

router.get('/api/get-proveedor-tipo/:id', getProveedorTipoId);

router.post('/api/post-proveedor-tipo', postProveedorTipo);

router.put('/api/put-proveedor-tipo/:id', putProveedorTipo);

router.delete('/api/delete-proveedor-tipo/:id', deleteProveedorTipo);

//PROVEEDOR

router.get('/api/get-proveedor', getproveedor);

router.get('/api/get-proveedor/:id', getProveedorId);

router.post('/api/post-proveedor', postproveedor);

router.put('/api/put-proveedor/:id', putproveedor);

router.delete('/api/delete-proveedor/:id', deleteproveedor)

//PRODUCTO Y PROVEEDOR

router.get('/api/get-prodprov', getProdProv);

router.get('/api/get-prodprovid', getProdProvTableId);

router.get('/api/get-prodprov/:id', getProdProvId );

router.post('/api/post-prodprov', postProdProv);

router.put('/api/put-prodprov/:id', putProdProv);

router.delete('/api/delete-prodprov/:id', deleteProdProv)

// PRODUCTOS 

router.get('/api/get-productos', getProductos) 

router.get('/api/getfull-productos', getFullProductos);

router.get('/api/getfull-productos/:id', getFullProductosId);

router.get('/api/getdetails-products/:id', getDetailsProductosId);

router.post('/api/postfull-productos', postFullProductos);

router.put('/api/put-producto/:id', putProducto);

router.put('/api/putdetails-producto/:id', putProductoDetails)

router.delete('/api/delete-producto/:id', deleteProducto);

// PRODUCTO - PRECIOS

router.get('/api/get-precios', getPrecios);

router.get('/api/get-precios/:idprecio', getPreciosId);

router.post('/api/post-precio', postPrecio);

router.put('/api/put-precios/:idprecio', putPrecio);

router.delete('/api/delete-precios/:idprecio', deletePrecio);
 
export default router; 