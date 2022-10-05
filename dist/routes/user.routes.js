"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _verifyToken = require("../helpers/verifyToken");

var router = (0, _express.Router)();
router.get('/api/usuarios', _verifyToken.verifyToken, _user.getUsuarios);
router.get('/api/usuarios/:id', _verifyToken.verifyToken, _user.getUserById);
router.get('/api/usuarioscount', _verifyToken.verifyToken, _user.getCountUsers);
router.post('/api/usuarios', _verifyToken.verifyToken, _user.newUsuario);
router["delete"]('/api/usuarios/:id', _verifyToken.verifyToken, _user.deleteUserById);
router.put('/api/usuarios/:id', _verifyToken.verifyToken, _user.updateUserById);
router.get('/usuarios', _verifyToken.verifyToken, _user.userView);
router.get('/user-new', _user.userNewView);
var _default = router;
exports["default"] = _default;