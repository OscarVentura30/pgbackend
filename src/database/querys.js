export const queries = {

    getAllusers: 'select * from usuario_t',
    InsertNewUser: 'INSERT INTO usuario_t (nombre, apellido, email, password, salario, rol, userName) VALUES (@nombre,@apellido,@email,@password,@salario,@rol,@userName)',
    getUserById: 'select * from usuario_t where id = @id',
    deleteUserById: 'delete from usuario_t where id = @id ',
    getCountUsers: 'select count(*) from usuario_t',
    updateUserById : 'update usuario_t set nombre = @nombre , apellido = @apellido , email = @email , password = @password ,salario = @salario, rol = @rol , userName = @userName where id = @id',
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
        getPrecios: `select idprecio, productoId, codigoBarras, nombre, descripcion, precioVenta from precio_t 
                    inner join producto_t on (precio_t.productoId = producto_t.id)
                    inner join contenido_t on (precio_t.contenidoId = contenido_t.id);`,
        getPreciosId: `select idprecio, productoId, codigoBarras, nombre, descripcion, precioVenta from precio_t 
                        inner join producto_t on (precio_t.productoId = producto_t.id)
                        inner join contenido_t on (precio_t.contenidoId = contenido_t.id)
                        where idprecio = @idprecio`,
        postPrecios: `BEGIN TRY
                        BEGIN TRAN
                            if not exists (select * from precio_t where productoId = @productoId and contenidoId = @contenidoId) 
                            begin
                            insert into precio_t (productoId, contenidoId, precioVenta) values (@productoId, @contenidoId, @precioVenta)
                            end
                            COMMIT TRAN
                        END TRY
                        BEGIN CATCH
                            select ERROR_MESSAGE();
                            ROLLBACK
                        END CATCH`,
        putPrecios:'update precio_t set precioVenta = @precioVenta where idprecio = @idprecio',
        deletePrecios: 'delete from precio_t where idprecio = @idprecio',

    //proveedores tipo
        getproveedorTipo:'select * from productoServicio_t',
        getproveedorTipoId: 'select * from productoServicio_t where id = @id',
        postproveedorTipo: 'insert into productoServicio_t (productoServicio, descripcion) values (@productoServicio, @descripcion)',
        putproveedorTipo: 'update productoServicio_t set productoServicio = @productoServicio, descripcion = @descripcion  where id = @id ',
        deleteproveedorTipo:'delete from productoServicio_t where id = @id',

    //PROVEEDORES
        getproveedor:`select proveedor_t.id, nombre, telefono, productoServicio_t.productoServicio, proveedor_t.descripcion from proveedor_t 
        inner join productoServicio_t on (proveedor_t.productoServicioId = productoServicio_t.id)`,
        getproveedorId: 'select * from proveedor_t where id = @id', 
        postproveedor: `insert into proveedor_t (nombre, razonSocial, direccion, telefono, telefono2, email, sitioWeb, productoServicioId, descripcion) 
                        values (@nombre, @razonSocial, @direccion,@telefono, @telefono2, @email, @sitioWeb, @productoServicioId , @descripcion)`,
        putproveedor: `update proveedor_t set nombre=@nombre, razonSocial=@razonSocial, direccion=@direccion, telefono=@telefono,
        telefono2=@telefono2, email=@email, sitioWeb=@sitioWeb, productoServicioId=@productoServicioId, descripcion=@descripcion
        where id = @id`,
        deleteproveedor: 'delete from proveedor_t where id = @id',
    
    //PROVEEDORES-PRODUCTOS
        getproductosprov: `select productoProveedor_t.id, producto_t.codigoBarras, producto_t.nombre, proveedor_t.nombre as proveedor, productoProveedor_t.precioCompra, productoProveedor_t.plazoDias
        from productoProveedor_t 
        inner join producto_t on (productoProveedor_t.productoid = producto_t.id)
        inner join proveedor_t on (productoProveedor_t.proveedorid = proveedor_t.id)`,
        getproductosprovId:`select productoProveedor_t.id, producto_t.codigoBarras, producto_t.nombre, proveedor_t.nombre as proveedor, productoProveedor_t.precioCompra, productoProveedor_t.plazoDias
        from productoProveedor_t 
        inner join producto_t on (productoProveedor_t.productoid = producto_t.id)
        inner join proveedor_t on (productoProveedor_t.proveedorid = proveedor_t.id)
        where productoProveedor_t.id = @id`,
        getproductosprovCode:'select * from productoProveedor_t',
        postproductosprov: `BEGIN TRY
        BEGIN TRAN
            if not exists (select * from productoProveedor_t where productoId = @productoId and proveedorId = @proveedorId) 
            begin
            insert into productoProveedor_t (productoId, proveedorId, precioCompra, plazoDias) values (@productoId, @proveedorId, @precioCompra, @plazoDias)
            end
            COMMIT TRAN
        END TRY
        BEGIN CATCH
            select ERROR_MESSAGE();
            ROLLBACK
        END CATCH`,
        putproductosprov:'update productoProveedor_t set precioCompra=@precioCompra, plazoDias=@plazoDias where id=@id',
        deleteproductosprov: 'delete from productoProveedor_t where id = @id',

    // PRODUCTOS
        getFullProducts: `select producto_t.id, producto_t.codigoBarras, producto_t.nombre as nombre, marca_t.descripcion as marca, clasificacion_t.descripcion as tìpo, presentacion_t.descripcion as presentacion
        from detalleProducto_t 
        inner join producto_t on detalleProducto_t.productoId = producto_t.id
        inner join marca_t on detalleProducto_t.marcaId = marca_t.id
        inner join clasificacion_t on detalleProducto_t.clasificacionId = clasificacion_t.id
        inner join presentacion_t on detalleProducto_t.presentacionId = presentacion_t.id`,
        getFullProductsId: `select producto_t.id, producto_t.codigoBarras, producto_t.nombre as nombre, marca_t.descripcion as marca, clasificacion_t.descripcion as tìpo, presentacion_t.descripcion as presentacion
        from detalleProducto_t 
        inner join producto_t on detalleProducto_t.productoId = producto_t.id
        inner join marca_t on detalleProducto_t.marcaId = marca_t.id
        inner join clasificacion_t on detalleProducto_t.clasificacionId = clasificacion_t.id
        inner join presentacion_t on detalleProducto_t.presentacionId = presentacion_t.id
        where producto_t.id = @id`,
        getDetailsProductsIndexId: `select id,codigoBarras, nombre, marcaId, clasificacionId,presentacionId from producto_t 
        inner join detalleProducto_t 
        on (producto_t.id= detalleProducto_t.productoId) where producto_t.id = @id ;`,

        postProducts: `insert into producto_t 
        (codigoBarras, nombre)
        OUTPUT 
        inserted.id
        values 
        (@codigoBarras, @nombre)`,
        postProductsDetails: 'insert into detalleProducto_t (productoId, marcaId, clasificacionId, presentacionId) values (@productoId, @marcaId, @clasificacionId, @presentacionId)',

        postFullProducts: ` 
        BEGIN TRY
            BEGIN TRAN
                if @codigoBarras is null set @codigoBarras = 'no_registrado' 
                if not exists(select * from producto_t where codigoBarras = @codigoBarras and nombre = @nombre)
                    BEGIN
                    DECLARE @id int
                    DECLARE @date date = SYSDATETIME()

                    if @marcaId is null
                    begin 
                    set @marcaId =1
                    end

                    if @clasificacionId is null
                    begin 
                    set @clasificacionId =1
                    end

                    if @presentacionId is null
                    begin 
                    set @presentacionId =1
                    end

                    if @contenidoId is null
                    begin 
                    set @contenidoId =1
                    end

                    if @precioVenta is null
                    begin 
                    set @precioVenta = 0
                    end

                    if @proveedorId is null
                    begin 
                    set @proveedorId = 1
                    end

                    if @precioCompra is null
                    begin 
                    set @precioCompra = 0
                    end


                    insert into producto_t(codigoBarras, nombre) values (@codigoBarras, @nombre)

                    SET @id = SCOPE_IDENTITY()

                    insert into detalleProducto_t (productoId, marcaId, clasificacionId, presentacionId) 
                    values (@id, @marcaId,@clasificacionId,@presentacionId)

                    insert into precio_t(productoId,contenidoId,precioVenta)
                    values (@id, @contenidoId ,@precioVenta)

                    insert into productoProveedor_t (productoId, proveedorId, precioCompra)
                    values(@id,@proveedorId,@precioCompra)

                    insert into stock_t(productoId, cantidad, vencimiento)
                    values (@id, 0, @date)
                END

            COMMIT TRAN

        END TRY
        BEGIN CATCH
            select ERROR_MESSAGE();
            ROLLBACK
        END CATCH`,

        putProducto: 'update producto_t set codigoBarras = @codigoBarras, nombre = @nombre where id = @id',
        putProductoDetails: `
        BEGIN TRY
            BEGIN TRAN
        
                if @marcaId is null
                begin 
                set @marcaId =1
                end
            
                if @clasificacionId is null
                begin 
                set @clasificacionId =1
                end
            
                if @presentacionId is null
                begin 
                set @presentacionId =1
                end
            
                update producto_t set codigoBarras = @codigoBarras, nombre = @nombre where id = @id
            
                update detalleProducto_t set marcaId = @marcaId, clasificacionId = @clasificacionId, presentacionId = @presentacionId
                where productoId = @id
            
        
            COMMIT TRAN
        END TRY
        BEGIN CATCH
            select ERROR_MESSAGE();
            ROLLBACK
        END CATCH`,

        deleteProducto: 'delete from producto_t where id = @id',
        getProducto:'select * from producto_t',

    // STOCK DE PRODUCTOS

        getStock: `select stock_t.id,codigoBarras, nombre, cantidad, CONVERT(varchar,vencimiento,103) as vencimiento
        from stock_t 
        inner join producto_t on (stock_t.productoId = producto_t.id)`,
        getStockId: `select stock_t.id,codigoBarras, nombre, cantidad, CONVERT(varchar,vencimiento,103) as vencimiento
        from stock_t 
        inner join producto_t on (stock_t.productoId = producto_t.id)
        where stock_t.id = @id`,
        putStockId: `update stock_t set cantidad = @cantidad, vencimiento = CONVERT(date, @vencimiento,103)  where id = @id `
    
}