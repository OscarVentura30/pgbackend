import {getConnection, sql, queries} from '../database';

export const getProductos =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getProducto)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getFullProductos =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getFullProducts)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getDetailsProductosId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getDetailsProductsIndexId);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: 'Error: No se encuentra recurso'});
        }

        res.json(result.recordset);

    } catch (error) {
        
        res.status(500);
        res.send(error.message);
    }
};

export const getFullProductosId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getFullProductsId);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: 'Error: No se encuentra recurso'});
        }

        res.json(result.recordset);

    } catch (error) {
        
        res.status(500);
        res.send(error.message);
    }
};

export const postFullProductos = async (req, res) => { 
    
    const {codigoBarras, nombre, marcaId, clasificacionId, presentacionId, contenidoId, precioVenta, proveedorId, precioCompra } = req.body;
    
    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("codigoBarras", sql.VarChar, codigoBarras)
                    .input("nombre", sql.VarChar, nombre)
                    .input("marcaId", sql.Int, marcaId)
                    .input("clasificacionId", sql.Int, clasificacionId)
                    .input("presentacionId", sql.Int, presentacionId)
                    .input("contenidoId", sql.Int, contenidoId)
                    .input("precioVenta", sql.Decimal(18,2), precioVenta)
                    .input("proveedorId", sql.Int, proveedorId)
                    .input("precioCompra", sql.Numeric(18,2), precioCompra)
                    .query(queries.postFullProducts)
        
        if (result.rowsAffected[2] == 0 || result.rowsAffected[3] == 0 || result.rowsAffected[4] == 0) {

            return res.status(400).json({ msg: '400 Error: no es posible insertar'});
        }

        if(result.rowsAffected[5]== 0 || result.rowsAffected[6]== 0){
            return res.status(400).json({ msg: '400 Error: no es posible insertar'});
        }
        
        /*console.log(result);*/

        res.status(200).json({ msg: '200 Ok: Insertar ok'})
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }

};

export const putProducto = async (req, res) => {

    const {codigoBarras, nombre,} = req.body;

    const{id} = req.params;

    if (!nombre) {
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("id", sql.Int, id)
                .input("codigoBarras", sql.VarChar, codigoBarras)
                .input("nombre", sql.VarChar, nombre)
                .query(queries.putProducto);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: 'Error: no es posible actualizar'});
        }

        res.status(200).json({ msg: 'Ok: Actualizar ok'});
                        
    } catch (error) {

        res.status(500);
        res.send(error.message); 
        
    }

};

export const putProductoDetails = async (req, res) => {

    const {codigoBarras, nombre, 
            marcaId, clasificacionId, presentacionId} = req.body

    const{id} = req.params;

    if (!nombre) {
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("id", sql.Int, id)
                .input("codigoBarras", sql.VarChar, codigoBarras)
                .input("nombre", sql.VarChar, nombre)
                .input("marcaId", sql.Int, marcaId)
                .input("clasificacionId", sql.Int, clasificacionId)
                .input("presentacionId", sql.Int, presentacionId)
                .query(queries.putProductoDetails);
        
        if (result.rowsAffected[1] == 0)
        {
            return res.status(400).json({ msg: '400 Error: no es posible actualizar'});
        }

        res.status(200).json({ msg: '200 Ok: Actualizar ok'});
                        
    } catch (error) {

        res.status(500);
        res.send(error.message); 
        
    }

};

export const deleteProducto = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.deleteProducto);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: 'Error: Error al eliminar'});
        }

        res.status(200).json({ msg: 'Ok: Eliminar ok'})
        
    } catch (error) {

        res.status(500);
        res.send(error.message); 
        
    }
}


