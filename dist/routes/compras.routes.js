"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _compras = require("../controllers/compras.controller");

var router = (0, _express.Router)();
router.get('/compras', _compras.comprasView);
router.get('/compras-registrar', _compras.comprasRegistrarView);
router.post('/api/post-compra1', _compras.postCompra1);
router.post('/api/post-compra2', _compras.postCompra2);
router.get('/api/get-compras', _compras.getCompras);
router.get('/api/get-compras/:id', _compras.getComprasId);
var _default = router;
exports["default"] = _default;