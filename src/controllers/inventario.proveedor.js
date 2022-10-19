import {getConnection, sql, queries} from '../database';


export const getproveedor =  async (req, res) => {
 
    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getproveedor)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getProveedorId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getproveedorId);
        
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

export const postproveedor = async (req, res) => {
    
    const {nombre, razonSocial, direccion, telefono, 
        telefono2, email, sitioWeb, productoServicioId, descripcion} = req.body;

    if ( nombre == null || nombre == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("nombre", sql.VarChar, nombre)
                    .input("razonSocial", sql.VarChar, razonSocial)
                    .input("direccion", sql.VarChar, direccion)
                    .input("telefono", sql.VarChar, telefono)
                    .input("telefono2", sql.VarChar, telefono2)
                    .input("email", sql.VarChar, email)
                    .input("sitioWeb", sql.VarChar, sitioWeb)
                    .input("productoServicioId", sql.Int, productoServicioId)
                    .input("descripcion", sql.VarChar, descripcion)
                    .query(queries.postproveedor);

        if (result.rowsAffected == 0) {
            return res.status(400).json({ msg: '400 Error: Error al insertar '});
        }
        
        res.status(200).json({ msg: 'Ok: Insertar ok'})
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const putproveedor = async (req, res) => {
    
    const {nombre, razonSocial, direccion, telefono, 
        telefono2, email, sitioWeb, productoServicioId, descripcion} = req.body;

    const {id} = req.params

    if ( nombre == null || nombre == "") {
        
        return res.status(400).json({ msg: '400 Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("id", sql.VarChar, id)
                    .input("nombre", sql.VarChar, nombre)
                    .input("razonSocial", sql.VarChar, razonSocial)
                    .input("direccion", sql.VarChar, direccion)
                    .input("telefono", sql.VarChar, telefono)
                    .input("telefono2", sql.VarChar, telefono2)
                    .input("email", sql.VarChar, email)
                    .input("sitioWeb", sql.VarChar, sitioWeb)
                    .input("productoServicioId", sql.Int, productoServicioId)
                    .input("descripcion", sql.VarChar, descripcion)
                    .query(queries.putproveedor);

        if (result.rowsAffected == 0) {
            return res.status(400).json({ msg: '400 Error: Error al actualizar '});
        }
        
        res.status(200).json({ msg: '200 Ok: Actualizar  ok'})
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const deleteproveedor = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.deleteproveedor);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: '400 Error: Error al eliminar'});
        }

        res.status(200).json({ msg: '200 Ok: Eliminar ok'})
        
    } catch (error) {

        res.status(500);
        res.send(error.message); 
        
    }
}