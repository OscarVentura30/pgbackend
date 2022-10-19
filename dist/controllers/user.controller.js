"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userView = exports.userNewView = exports.updateUserById = exports.newUsuario = exports.getUsuarios = exports.getUserById = exports.getCountUsers = exports.deleteUserById = void 0;

var _jquery = require("jquery");

var _morgan = require("morgan");

var _database = require("../database");

var _handleBcrypt = require("../helpers/handleBcrypt");

var _validateData = require("../helpers/validateData");

var _tokenUser = require("../helpers/tokenUser");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUsuarios = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _database.getConnection)();

          case 3:
            pool = _context.sent;
            _context.next = 6;
            return pool.request().query(_database.queries.getAllusers);

          case 6:
            result = _context.sent;
            res.json(result.recordset);
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(500);
            res.send(_context.t0.message);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getUsuarios(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsuarios = getUsuarios;

var newUsuario = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, nombre, apellido, email, password, salario, rol, userName, passwordHash, pool;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, apellido = _req$body.apellido, email = _req$body.email, password = _req$body.password, salario = _req$body.salario, rol = _req$body.rol, userName = _req$body.userName;

            if (!((0, _validateData.validarNombre)(nombre) == false || (0, _validateData.validarNombre)(apellido) == false)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'Error: Nombre o apellido no valido'
            }));

          case 3:
            if (!((0, _validateData.validarEmail)(email) == false)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'Error: Email no valido'
            }));

          case 5:
            if (!((0, _validateData.validarPassword)(password) == false)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'Error: clave debe tener numeros y letras, 8 digitos'
            }));

          case 7:
            if (!((0, _validateData.validarNumero)(salario) == false)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'Error: Salario no valido'
            }));

          case 9:
            _context2.next = 11;
            return (0, _validateData.validarUser)(userName);

          case 11:
            _context2.t0 = _context2.sent;

            if (!(_context2.t0 == false)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              msg: 'Error: Usuario del sistema no se debe repetir y debe tener al menos 5 carateres'
            }));

          case 14:
            _context2.next = 16;
            return (0, _handleBcrypt.encrypt)(password);

          case 16:
            passwordHash = _context2.sent;
            console.log(nombre, apellido, email, passwordHash, salario, rol, userName);
            _context2.prev = 18;
            _context2.next = 21;
            return (0, _database.getConnection)();

          case 21:
            pool = _context2.sent;
            _context2.next = 24;
            return pool.request().input("nombre", _database.sql.VarChar, nombre).input("apellido", _database.sql.VarChar, apellido).input("email", _database.sql.VarChar, email).input("password", _database.sql.VarChar, passwordHash).input("salario", _database.sql.Numeric, salario).input("rol", _database.sql.Int, rol).input("userName", _database.sql.VarChar, userName).query(_database.queries.InsertNewUser);

          case 24:
            console.log('Crear nuevo Usuario ok ');
            res.redirect('/usuarios');
            _context2.next = 32;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t1 = _context2["catch"](18);
            res.status(500);
            res.send(_context2.t1.message + 'El rol no existe ');

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[18, 28]]);
  }));

  return function newUsuario(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.newUsuario = newUsuario;

var getUserById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, pool, result, datos, cookies, tokenUser, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _database.getConnection)();

          case 4:
            pool = _context3.sent;
            _context3.next = 7;
            return pool.request().input("id", id).query(_database.queries.getUserById);

          case 7:
            result = _context3.sent;

            if (result.recordset[0] == null) {
              res.json('No se encuentra Usuario ');
            }
            /*res.send(result.recordset[0]);*/


            datos = result.recordset[0];
            /*console.log(datos.userName);*/

            cookies = req.cookies;
            tokenUser = cookies.xtoken;
            user = (0, _tokenUser.idUserToken)(tokenUser);
            res.render('usuario.editar.hbs', {
              id: datos.id,
              nombre: datos.nombre,
              apellido: datos.apellido,
              email: datos.email,
              salario: datos.salario,
              rol: datos.rol,
              usuario: datos.userName,
              sesionUser: user
            });
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](1);
            res.status(500);
            res.send(_context3.t0.message + ' / no se econtro usuario ' + id);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 16]]);
  }));

  return function getUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, pool, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return (0, _validateData.validarIdUsuario)(id);

          case 3:
            _context4.t0 = _context4.sent;

            if (!(_context4.t0 == false)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: 'Id de usuario no existe, no es posible eliminar'
            }));

          case 6:
            _context4.prev = 6;
            _context4.next = 9;
            return (0, _database.getConnection)();

          case 9:
            pool = _context4.sent;
            _context4.next = 12;
            return pool.request().input("id", id).query(_database.queries.deleteUserById);

          case 12:
            result = _context4.sent;
            res.status(204).json({
              msg: 'Eliminar ok'
            });
            _context4.next = 20;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t1 = _context4["catch"](6);
            res.status(500);
            res.send(_context4.t1.message + 'Error al eliminar');

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 16]]);
  }));

  return function deleteUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;

var getCountUsers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _database.getConnection)();

          case 3:
            pool = _context5.sent;
            _context5.next = 6;
            return pool.request().query(_database.queries.getCountUsers);

          case 6:
            result = _context5.sent;
            res.json(result.recordset[0]['']);
            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500);
            res.send(_context5.t0.message + 'Erro al contar');

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function getCountUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCountUsers = getCountUsers;

var updateUserById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body2, nombre, apellido, email, password, salario, rol, userName, id, passwordHash, pool, result;

    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, nombre = _req$body2.nombre, apellido = _req$body2.apellido, email = _req$body2.email, password = _req$body2.password, salario = _req$body2.salario, rol = _req$body2.rol, userName = _req$body2.userName;
            id = req.params.id;

            if (!(nombre == null || apellido == null)) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              msg: 'Falta Datos obligatorios'
            }));

          case 4:
            _context6.next = 6;
            return (0, _validateData.validarIdUsuario)(id);

          case 6:
            _context6.t0 = _context6.sent;

            if (!(_context6.t0 == false)) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              msg: 'Id de usuario no existe'
            }));

          case 9:
            _context6.next = 11;
            return (0, _handleBcrypt.encrypt)(password);

          case 11:
            passwordHash = _context6.sent;
            _context6.prev = 12;
            _context6.next = 15;
            return (0, _database.getConnection)();

          case 15:
            pool = _context6.sent;
            _context6.next = 18;
            return pool.request().input("id", id).input("nombre", _database.sql.VarChar, nombre).input("apellido", _database.sql.VarChar, apellido).input("email", _database.sql.VarChar, email).input("password", _database.sql.VarChar, passwordHash).input("salario", _database.sql.Numeric, salario).input("rol", _database.sql.Int, rol).input("userName", _database.sql.VarChar, userName).query(_database.queries.updateUserById);

          case 18:
            result = _context6.sent;
            res.json({
              msg: 'Status: 200 , actualizar ok'
            });
            _context6.next = 26;
            break;

          case 22:
            _context6.prev = 22;
            _context6.t1 = _context6["catch"](12);
            res.status(500);
            res.send(_context6.t1.message + '/ Error al Actualizar ');

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[12, 22]]);
  }));

  return function updateUserById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateUserById = updateUserById;

var userView = function userView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('usuarios.index.hbs', {
    titulo: 'Usuarios',
    message: 'Pagina de usuarios',
    sesionUser: user
  });
};

exports.userView = userView;

var userNewView = function userNewView(req, res) {
  var cookies = req.cookies;
  var tokenUser = cookies.xtoken;
  var user = (0, _tokenUser.idUserToken)(tokenUser);
  res.render('usuario.nuevo.hbs', {
    titulo: 'Usuarios',
    mensaje: "inicio",
    sesionUser: user
  });
};

exports.userNewView = userNewView;