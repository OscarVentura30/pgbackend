"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _login = require("../controllers/login.controller");

var _verifyToken = require("../helpers/verifyToken");

/*import jwt from 'jsonwebtoken';*/
var router = (0, _express.Router)();
router.post('/login', _login.loginIn);
router.get('/logout', _verifyToken.verifyToken, _login.logoutProfile);
var _default = router;
exports["default"] = _default;