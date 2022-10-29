"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _ventas = require("../controllers/ventas.controller");

var router = (0, _express.Router)(); //Vista

router.get('/ventas', _ventas.ventasView);
router.get('/api/get-ventas', _ventas.getVentas);
router.get('/api/get-ventas/:id', _ventas.getVentaId);
router.get('/api/get-venta1/:id', _ventas.getVenta1);
var _default = router;
exports["default"] = _default;