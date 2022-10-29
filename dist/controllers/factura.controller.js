"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facturaView = exports.facturaGView = void 0;

var _tokenUser = require("../helpers/tokenUser");

var _database = require("../database");

var facturaView = function facturaView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('factura.index.hbs', {
    titulo: 'factura',
    sesionUser: user
  });
};

exports.facturaView = facturaView;

var facturaGView = function facturaGView(req, res) {
  var cookies = req.cookies;
  var id = req.params.id;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('factura.confirm.hbs', {
    titulo: 'factura',
    sesionUser: user,
    idventa: id
  });
};

exports.facturaGView = facturaGView;