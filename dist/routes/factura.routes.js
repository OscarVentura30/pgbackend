"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _factura = require("../controllers/factura.controller");

var router = (0, _express.Router)();
router.get('/factura', _factura.facturaView);
router.get('/factura-generar/:id', _factura.facturaGView);
var _default = router;
exports["default"] = _default;