"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _dashboard = require("../controllers/dashboard.controller");

var router = (0, _express.Router)();
router.get('/dashboard', _dashboard.dashboardView);
var _default = router;
exports["default"] = _default;