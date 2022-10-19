"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _inventario = require("../controllers/inventario.controller");

var _inventarioMarca = require("../controllers/inventario.marca.controller");

var _inventarioTipo = require("../controllers/inventario.tipo.controller");

var _inventarioPresent = require("../controllers/inventario.present.controller");

var _inventarioProducto = require("../controllers/inventario.producto.controller");

var _inventarioUnidad = require("../controllers/inventario.unidad.controller");

var _inventarioPrecio = require("../controllers/inventario.precio.controller");

var _inventarioProveedor = require("../controllers/inventario.proveedor.tipo");

var _inventario2 = require("../controllers/inventario.proveedor");

var _inventarioProveedor2 = require("../controllers/inventario.proveedor.pro");

var router = (0, _express.Router)(); // Vistas 

router.get('/inventario', _inventario.inventarioView);
router.get('/producto', _inventario.productoView);
router.get('/producto-nuevo', _inventario.productoNewView);
router.get('/producto-tipo', _inventario.typoProductView);
router.get('/producto-unidades', _inventario.packProductView);
router.get('/producto-marca', _inventario.marcaProductView);
router.get('/producto-presentacion', _inventario.PresentProductView);
router.get('/producto-proveedor', _inventario.ProveedorView);
router.get('/producto-proveedor-tipo', _inventario.ProveedorTypeView);
router.get('/producto-precio', _inventario.PreciosView);
router.get('/proveedor-producto', _inventario.ProductoProveedorView); // Marca CRUD

router.get('/api/get-marcas', _inventarioMarca.getMarca);
router.get('/api/get-marcas/:id', _inventarioMarca.getMarcaId);
router.post('/api/post-marcas', _inventarioMarca.postMarca);
router.put('/api/put-marcas/:id', _inventarioMarca.putMarca);
router["delete"]('/api/delete-marca/:id', _inventarioMarca.deleteMarca); // Clasificacion CRUD

router.get('/api/get-tipo', _inventarioTipo.getTipo);
router.get('/api/get-tipo/:id', _inventarioTipo.getTipoId);
router.post('/api/post-tipo', _inventarioTipo.postTipo);
router.put('/api/put-tipo/:id', _inventarioTipo.putTipo);
router["delete"]('/api/delete-tipo/:id', _inventarioTipo.deleteTipo); // PRESENTACION DE PRODUCTOS

router.get('/api/get-present', _inventarioPresent.getPresent);
router.get('/api/get-present/:id', _inventarioPresent.getPresentId);
router.post('/api/post-present', _inventarioPresent.postPresent);
router.put('/api/put-present/:id', _inventarioPresent.putPresent);
router["delete"]('/api/delete-present/:id', _inventarioPresent.deletePresent); // UNIDADES DE PRODUCTOS

router.get('/api/get-unidades', _inventarioUnidad.getUnidad);
router.get('/api/get-unidades/:id', _inventarioUnidad.getUnidadId);
router.post('/api/post-unidades', _inventarioUnidad.postUnidad);
router.put('/api/put-unidades/:id', _inventarioUnidad.putUnidad);
router["delete"]('/api/delete-unidades/:id', _inventarioUnidad.deleteUnidad); //PROVEEDORES TIPO

router.get('/api/get-proveedor-tipo', _inventarioProveedor.getProveedorTipo);
router.get('/api/get-proveedor-tipo/:id', _inventarioProveedor.getProveedorTipoId);
router.post('/api/post-proveedor-tipo', _inventarioProveedor.postProveedorTipo);
router.put('/api/put-proveedor-tipo/:id', _inventarioProveedor.putProveedorTipo);
router["delete"]('/api/delete-proveedor-tipo/:id', _inventarioProveedor.deleteProveedorTipo); //PROVEEDOR

router.get('/api/get-proveedor', _inventario2.getproveedor);
router.get('/api/get-proveedor/:id', _inventario2.getProveedorId);
router.post('/api/post-proveedor', _inventario2.postproveedor);
router.put('/api/put-proveedor/:id', _inventario2.putproveedor);
router["delete"]('/api/delete-proveedor/:id', _inventario2.deleteproveedor); //PRODUCTO Y PROVEEDOR

router.get('/api/get-prodprov', _inventarioProveedor2.getProdProv);
router.get('/api/get-prodprovid', _inventarioProveedor2.getProdProvTableId);
router.get('/api/get-prodprov/:id', _inventarioProveedor2.getProdProvId);
router.post('/api/post-prodprov', _inventarioProveedor2.postProdProv);
router.put('/api/put-prodprov/:id', _inventarioProveedor2.putProdProv);
router["delete"]('/api/delete-prodprov/:id', _inventarioProveedor2.deleteProdProv); // PRODUCTOS 

router.get('/api/get-productos', _inventarioProducto.getProductos);
router.get('/api/getfull-productos', _inventarioProducto.getFullProductos);
router.get('/api/getfull-productos/:id', _inventarioProducto.getFullProductosId);
router.get('/api/getdetails-products/:id', _inventarioProducto.getDetailsProductosId);
router.post('/api/postfull-productos', _inventarioProducto.postFullProductos);
router.put('/api/put-producto/:id', _inventarioProducto.putProducto);
router.put('/api/putdetails-producto/:id', _inventarioProducto.putProductoDetails);
router["delete"]('/api/delete-producto/:id', _inventarioProducto.deleteProducto); // PRODUCTO - PRECIOS

router.get('/api/get-precios', _inventarioPrecio.getPrecios);
router.get('/api/get-precios/:idprecio', _inventarioPrecio.getPreciosId);
router.post('/api/post-precio', _inventarioPrecio.postPrecio);
router.put('/api/put-precios/:idprecio', _inventarioPrecio.putPrecio);
router["delete"]('/api/delete-precios/:idprecio', _inventarioPrecio.deletePrecio);
var _default = router;
exports["default"] = _default;