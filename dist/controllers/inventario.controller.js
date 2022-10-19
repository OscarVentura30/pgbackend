"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typoProductView = exports.productoView = exports.productoNewView = exports.packProductView = exports.marcaProductView = exports.inventarioView = exports.ProveedorView = exports.ProveedorTypeView = exports.ProductoProveedorView = exports.PresentProductView = exports.PreciosView = void 0;

var _tokenUser = require("../helpers/tokenUser");

var inventarioView = function inventarioView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.index.hbs', {
    titulo: 'Inventario',
    sesionUser: user
  });
};

exports.inventarioView = inventarioView;

var productoView = function productoView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.producto.hbs', {
    titulo: 'Productos',
    sesionUser: user
  });
};

exports.productoView = productoView;

var productoNewView = function productoNewView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.producto.nuevo.hbs', {
    titulo: 'Nuevo-Producto',
    sesionUser: user
  });
};

exports.productoNewView = productoNewView;

var typoProductView = function typoProductView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.tipo.hbs', {
    titulo: 'Clasificar productos',
    sesionUser: user
  });
};

exports.typoProductView = typoProductView;

var packProductView = function packProductView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.tamano.hbs', {
    titulo: 'protucto tamaño',
    sesionUser: user
  });
};

exports.packProductView = packProductView;

var marcaProductView = function marcaProductView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.marca.hbs', {
    titulo: 'protucto marca',
    sesionUser: user
  });
};

exports.marcaProductView = marcaProductView;

var ProveedorView = function ProveedorView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.proveedor.hbs', {
    titulo: 'proveedores',
    sesionUser: user
  });
};

exports.ProveedorView = ProveedorView;

var ProveedorTypeView = function ProveedorTypeView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.proveedor.tipo.hbs', {
    titulo: 'proveedores tipo',
    sesionUser: user
  });
};

exports.ProveedorTypeView = ProveedorTypeView;

var PresentProductView = function PresentProductView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.presentacion.hbs', {
    titulo: 'Presentacion productos',
    sesionUser: user
  });
};

exports.PresentProductView = PresentProductView;

var PreciosView = function PreciosView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.precio.hbs', {
    titulo: 'Precio productos',
    sesionUser: user
  });
};

exports.PreciosView = PreciosView;

var ProductoProveedorView = function ProductoProveedorView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('inventario.proveedor.pro.hbs', {
    titulo: 'proveedor productos',
    sesionUser: user
  });
};

exports.ProductoProveedorView = ProductoProveedorView;