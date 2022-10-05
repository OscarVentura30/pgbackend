"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idUserToken = void 0;

var jwt = require('jsonwebtoken');

var idUserToken = function idUserToken(ttoken) {
  var dataToken = jwt.decode(ttoken);
  return dataToken.id;
};

exports.idUserToken = idUserToken;