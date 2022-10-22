"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _caja = require("../controllers/caja.controller");

var router = (0, _express.Router)(); //Vista

router.get('/caja', _caja.cajaView);
router.post('/api/post-caja1', _caja.postVenta1);
router.post('/api/post-caja2', _caja.postVenta2);
var _default = router;
exports["default"] = _default;