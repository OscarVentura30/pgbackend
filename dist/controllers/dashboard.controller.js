"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardView = void 0;

var _tokenUser = require("../helpers/tokenUser");

var _database = require("../database");

var dashboardView = function dashboardView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('dashboard.index.hbs', {
    titulo: 'Dashboard',
    sesionUser: user
  });
};

exports.dashboardView = dashboardView;