"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _verifyToken = require("../helpers/verifyToken");

var router = (0, _express.Router)();
router.get('/usuarios', _verifyToken.verifyToken, _user.getUsuarios);
router.get('/usuarios/:id', _verifyToken.verifyToken, _user.getUserById);
router.get('/usuarioscount', _verifyToken.verifyToken, _user.getCountUsers);
router.post('/usuarios', _verifyToken.verifyToken, _user.newUsuario);
router["delete"]('/usuarios/:id', _verifyToken.verifyToken, _user.deleteUserById);
router.put('/usuarios/:id', _verifyToken.verifyToken, _user.updateUserById);
var _default = router;
exports["default"] = _default;