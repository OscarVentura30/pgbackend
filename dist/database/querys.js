"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = {
  getAllusers: 'select * from usuario_t',
  InsertNewUser: 'INSERT INTO usuario_t (nombre, apellido, email, password, salario, rol, userName) VALUES (@nombre,@apellido,@email,@password,@salario,@rol,@userName)',
  getUserById: 'select * from usuario_t where id = @id',
  deleteUserById: 'delete from usuario_t where id = @id ',
  getCountUsers: 'select count(*) from usuario_t',
  updateUserById: 'update usuario_t set nombre = @nombre , apellido = @apellido , email = @email , password = @password ,salario = @salario, rol = @rol , userName = @userName where id = @id',
  loginUser: 'select * from usuario_t where userName = @userName',
  validateUser: 'select * from usuario_t where userName = @userName',
  validateIdUser: 'select id from usuario_t where id = @id',
  getAllClient: 'select * from cliente_t',
  InsertClient: 'insert into cliente_t (nombre, nit, direccion, telefono, email, tipoClienteId) values(@nombre, @nit, @direccion, @telefono,@email, @tipoClienteId);',
  getTypeClient: 'select * from tipoCliente_t',
  validateIdClient: 'select id from cliente_t where id = @id',
  deleteClientById: 'delete from cliente_t where id = @id ',
  updateClientById: 'update cliente_t set nombre = @nombre, nit = @nit, direccion = @direccion, telefono = @telefono, email = @email, tipoClienteId = @tipoClienteId where id = @id',
  getClientById: 'select * from cliente_t where id = @id'
};
exports.queries = queries;