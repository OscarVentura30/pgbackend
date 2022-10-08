"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _clientes = require("../controllers/clientes.controllers");

var _clientesNuevo = require("../controllers/clientes.nuevo.controllers");

var _clientesBorrar = require("../controllers/clientes.borrar.controller");

var router = (0, _express.Router)();
router.get('/clientes', _clientes.clientesView);
router.get('/api/clientes', _clientes.getClientes);
router.get('/api/get-type-client', _clientes.getTypeClient);
router.get('/clientes-nuevo', _clientes.newClienteView);
router.post('/api/cliente-nuevo', _clientesNuevo.newClient);
router["delete"]('/api/delete-cliente/:id', _clientesBorrar.deleteClientById);
var _default = router;
exports["default"] = _default;