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
router.post('/api/login', _login.loginIn);
router.get('/api/logout', _verifyToken.verifyToken, _login.logoutProfile);
router.get('/', _login.homeView);
router.get('/login', _login.loginView);
router.get('/index', _login.indexView);
var _default = router;
exports["default"] = _default;