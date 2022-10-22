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
  InsertClient: 'insert into cliente_t (nombre, nit, direccion, telefono, email, tipoClienteId) values(@nombre, @nit, @direccion, @telefono,@email, @tipoClienteId)',
  getTypeClient: 'select * from tipoCliente_t',
  validateIdClient: 'select id from cliente_t where id = @id',
  deleteClientById: 'delete from cliente_t where id = @id ',
  updateClientById: 'update cliente_t set nombre = @nombre, nit = @nit, direccion = @direccion, telefono = @telefono, email = @email, tipoClienteId = @tipoClienteId where id = @id',
  getClientById: 'select * from cliente_t where id = @id',
  // MARCA DE PRODUCTOS
  getMarcas: 'select * from marca_t',
  postMarcas: 'insert into marca_t (descripcion) values (@descripcion)',
  putMarcas: 'update marca_t set descripcion = @descripcion where id = @id ',
  deleteMarcas: 'delete from marca_t where id = @id',
  getMarcasId: 'select * from marca_t where id = @id',
  // CLASIFICACION DE PRODUCTOS
  getTipo: 'select * from clasificacion_t',
  getTipoId: 'select * from clasificacion_t where id = @id',
  postTipo: 'insert into clasificacion_t (descripcion) values (@descripcion)',
  putTipo: 'update clasificacion_t set descripcion = @descripcion where id = @id ',
  deleteTipo: 'delete from clasificacion_t where id = @id',
  // PRESENTACION DE PRODUCTOS
  getPresent: 'select * from presentacion_t',
  getPresentId: 'select * from presentacion_t where id = @id',
  postPresent: 'insert into presentacion_t (descripcion) values (@descripcion)',
  putPresent: 'update presentacion_t set descripcion = @descripcion where id = @id ',
  deletePresent: 'delete from presentacion_t where id = @id',
  // UNIDADES DE PRODUCTOS
  getUnidades: 'select * from contenido_t',
  getUnidadesId: 'select * from contenido_t where id = @id',
  postUnidades: 'insert into contenido_t (descripcion, valorUnitario) values (@descripcion, @valorUnitario)',
  putUnidades: 'update contenido_t set descripcion = @descripcion, valorUnitario = @valorUnitario  where id = @id ',
  deleteUnidades: 'delete from contenido_t where id = @id',
  // PRECIO DE PRODUCTOS
  getPrecios: "select idprecio, productoId, codigoBarras, nombre, descripcion, precioVenta from precio_t \n                    inner join producto_t on (precio_t.productoId = producto_t.id)\n                    inner join contenido_t on (precio_t.contenidoId = contenido_t.id);",
  getPreciosId: "select idprecio, productoId, codigoBarras, nombre, descripcion, precioVenta from precio_t \n                        inner join producto_t on (precio_t.productoId = producto_t.id)\n                        inner join contenido_t on (precio_t.contenidoId = contenido_t.id)\n                        where idprecio = @idprecio",
  postPrecios: "BEGIN TRY\n                        BEGIN TRAN\n                            if not exists (select * from precio_t where productoId = @productoId and contenidoId = @contenidoId) \n                            begin\n                            insert into precio_t (productoId, contenidoId, precioVenta) values (@productoId, @contenidoId, @precioVenta)\n                            end\n                            COMMIT TRAN\n                        END TRY\n                        BEGIN CATCH\n                            select ERROR_MESSAGE();\n                            ROLLBACK\n                        END CATCH",
  putPrecios: 'update precio_t set precioVenta = @precioVenta where idprecio = @idprecio',
  deletePrecios: 'delete from precio_t where idprecio = @idprecio',
  //proveedores tipo
  getproveedorTipo: 'select * from productoServicio_t',
  getproveedorTipoId: 'select * from productoServicio_t where id = @id',
  postproveedorTipo: 'insert into productoServicio_t (productoServicio, descripcion) values (@productoServicio, @descripcion)',
  putproveedorTipo: 'update productoServicio_t set productoServicio = @productoServicio, descripcion = @descripcion  where id = @id ',
  deleteproveedorTipo: 'delete from productoServicio_t where id = @id',
  //PROVEEDORES
  getproveedor: "select proveedor_t.id, nombre, telefono, productoServicio_t.productoServicio, proveedor_t.descripcion from proveedor_t \n        inner join productoServicio_t on (proveedor_t.productoServicioId = productoServicio_t.id)",
  getproveedorId: 'select * from proveedor_t where id = @id',
  postproveedor: "insert into proveedor_t (nombre, razonSocial, direccion, telefono, telefono2, email, sitioWeb, productoServicioId, descripcion) \n                        values (@nombre, @razonSocial, @direccion,@telefono, @telefono2, @email, @sitioWeb, @productoServicioId , @descripcion)",
  putproveedor: "update proveedor_t set nombre=@nombre, razonSocial=@razonSocial, direccion=@direccion, telefono=@telefono,\n        telefono2=@telefono2, email=@email, sitioWeb=@sitioWeb, productoServicioId=@productoServicioId, descripcion=@descripcion\n        where id = @id",
  deleteproveedor: 'delete from proveedor_t where id = @id',
  //PROVEEDORES-PRODUCTOS
  getproductosprov: "select productoProveedor_t.id, producto_t.codigoBarras, producto_t.nombre, proveedor_t.nombre as proveedor, productoProveedor_t.precioCompra, productoProveedor_t.plazoDias\n        from productoProveedor_t \n        inner join producto_t on (productoProveedor_t.productoid = producto_t.id)\n        inner join proveedor_t on (productoProveedor_t.proveedorid = proveedor_t.id)",
  getproductosprovId: "select productoProveedor_t.id, producto_t.codigoBarras, producto_t.nombre, proveedor_t.nombre as proveedor, productoProveedor_t.precioCompra, productoProveedor_t.plazoDias\n        from productoProveedor_t \n        inner join producto_t on (productoProveedor_t.productoid = producto_t.id)\n        inner join proveedor_t on (productoProveedor_t.proveedorid = proveedor_t.id)\n        where productoProveedor_t.id = @id",
  getproductosprovCode: 'select * from productoProveedor_t',
  postproductosprov: "BEGIN TRY\n        BEGIN TRAN\n            if not exists (select * from productoProveedor_t where productoId = @productoId and proveedorId = @proveedorId) \n            begin\n            insert into productoProveedor_t (productoId, proveedorId, precioCompra, plazoDias) values (@productoId, @proveedorId, @precioCompra, @plazoDias)\n            end\n            COMMIT TRAN\n        END TRY\n        BEGIN CATCH\n            select ERROR_MESSAGE();\n            ROLLBACK\n        END CATCH",
  putproductosprov: 'update productoProveedor_t set precioCompra=@precioCompra, plazoDias=@plazoDias where id=@id',
  deleteproductosprov: 'delete from productoProveedor_t where id = @id',
  // PRODUCTOS
  getFullProducts: "select producto_t.id, producto_t.codigoBarras, producto_t.nombre as nombre, marca_t.descripcion as marca, clasificacion_t.descripcion as t\xECpo, presentacion_t.descripcion as presentacion\n        from detalleProducto_t \n        inner join producto_t on detalleProducto_t.productoId = producto_t.id\n        inner join marca_t on detalleProducto_t.marcaId = marca_t.id\n        inner join clasificacion_t on detalleProducto_t.clasificacionId = clasificacion_t.id\n        inner join presentacion_t on detalleProducto_t.presentacionId = presentacion_t.id",
  getFullProductsId: "select producto_t.id, producto_t.codigoBarras, producto_t.nombre as nombre, marca_t.descripcion as marca, clasificacion_t.descripcion as t\xECpo, presentacion_t.descripcion as presentacion\n        from detalleProducto_t \n        inner join producto_t on detalleProducto_t.productoId = producto_t.id\n        inner join marca_t on detalleProducto_t.marcaId = marca_t.id\n        inner join clasificacion_t on detalleProducto_t.clasificacionId = clasificacion_t.id\n        inner join presentacion_t on detalleProducto_t.presentacionId = presentacion_t.id\n        where producto_t.id = @id",
  getDetailsProductsIndexId: "select id,codigoBarras, nombre, marcaId, clasificacionId,presentacionId from producto_t \n        inner join detalleProducto_t \n        on (producto_t.id= detalleProducto_t.productoId) where producto_t.id = @id ;",
  postProducts: "insert into producto_t \n        (codigoBarras, nombre)\n        OUTPUT \n        inserted.id\n        values \n        (@codigoBarras, @nombre)",
  postProductsDetails: 'insert into detalleProducto_t (productoId, marcaId, clasificacionId, presentacionId) values (@productoId, @marcaId, @clasificacionId, @presentacionId)',
  postFullProducts: " \n        BEGIN TRY\n            BEGIN TRAN\n                if @codigoBarras is null set @codigoBarras = 'no_registrado' \n                if not exists(select * from producto_t where codigoBarras = @codigoBarras and nombre = @nombre)\n                    BEGIN\n                    DECLARE @id int\n                    DECLARE @date date = SYSDATETIME()\n\n                    if @marcaId is null\n                    begin \n                    set @marcaId =1\n                    end\n\n                    if @clasificacionId is null\n                    begin \n                    set @clasificacionId =1\n                    end\n\n                    if @presentacionId is null\n                    begin \n                    set @presentacionId =1\n                    end\n\n                    if @contenidoId is null\n                    begin \n                    set @contenidoId =1\n                    end\n\n                    if @precioVenta is null\n                    begin \n                    set @precioVenta = 0\n                    end\n\n                    if @proveedorId is null\n                    begin \n                    set @proveedorId = 1\n                    end\n\n                    if @precioCompra is null\n                    begin \n                    set @precioCompra = 0\n                    end\n\n\n                    insert into producto_t(codigoBarras, nombre) values (@codigoBarras, @nombre)\n\n                    SET @id = SCOPE_IDENTITY()\n\n                    insert into detalleProducto_t (productoId, marcaId, clasificacionId, presentacionId) \n                    values (@id, @marcaId,@clasificacionId,@presentacionId)\n\n                    insert into precio_t(productoId,contenidoId,precioVenta)\n                    values (@id, @contenidoId ,@precioVenta)\n\n                    insert into productoProveedor_t (productoId, proveedorId, precioCompra)\n                    values(@id,@proveedorId,@precioCompra)\n\n                    insert into stock_t(productoId, cantidad, vencimiento)\n                    values (@id, 0, @date)\n                END\n\n            COMMIT TRAN\n\n        END TRY\n        BEGIN CATCH\n            select ERROR_MESSAGE();\n            ROLLBACK\n        END CATCH",
  putProducto: 'update producto_t set codigoBarras = @codigoBarras, nombre = @nombre where id = @id',
  putProductoDetails: "\n        BEGIN TRY\n            BEGIN TRAN\n        \n                if @marcaId is null\n                begin \n                set @marcaId =1\n                end\n            \n                if @clasificacionId is null\n                begin \n                set @clasificacionId =1\n                end\n            \n                if @presentacionId is null\n                begin \n                set @presentacionId =1\n                end\n            \n                update producto_t set codigoBarras = @codigoBarras, nombre = @nombre where id = @id\n            \n                update detalleProducto_t set marcaId = @marcaId, clasificacionId = @clasificacionId, presentacionId = @presentacionId\n                where productoId = @id\n            \n        \n            COMMIT TRAN\n        END TRY\n        BEGIN CATCH\n            select ERROR_MESSAGE();\n            ROLLBACK\n        END CATCH",
  deleteProducto: 'delete from producto_t where id = @id',
  getProducto: 'select * from producto_t',
  // STOCK DE PRODUCTOS
  getStock: "select stock_t.id,codigoBarras, nombre, cantidad, CONVERT(varchar,vencimiento,103) as vencimiento\n        from stock_t \n        inner join producto_t on (stock_t.productoId = producto_t.id)",
  getStockId: "select stock_t.id,codigoBarras, nombre, cantidad, CONVERT(varchar,vencimiento,103) as vencimiento\n        from stock_t \n        inner join producto_t on (stock_t.productoId = producto_t.id)\n        where stock_t.id = @id",
  putStockId: "update stock_t set cantidad = @cantidad, vencimiento = CONVERT(date, @vencimiento,103)  where id = @id ",
  // VENTAS 
  postVenta1: "\n        DECLARE @idUser int\n        DECLARE @date date = SYSDATETIME()\n        \n        set @idUser = (select id from usuario_t where userName = @userName)\n        \n        insert into venta_t (clienteId, usuarioId, fecha, estado, importe) \n        OUTPUT inserted.id\n        values (@clienteId, @idUser , @date, 1, @importe)",
  postVenta2: "insert into detalleVenta_t (ventaId, productoId, salida)\n        values (@ventaId, @productoId, @salida);",
  getVentas: "select venta_t.id, cliente_t.nombre , cliente_t.nit , usuario_t.userName,CONVERT(varchar,venta_t.fecha,103) as fecha, venta_t.importe\n        from venta_t \n        inner join cliente_t on (venta_t.clienteId = cliente_t.id)\n        inner join usuario_t on (venta_t.usuarioId = usuario_t.id)",
  getVentasId: "select detalleVenta_t.salida as cantidad , producto_t.nombre as descripcion\n        from detalleVenta_t \n        inner join producto_t on (detalleVenta_t.productoId = producto_t.id)\n        where detalleVenta_t.ventaId = @id"
};
exports.queries = queries;