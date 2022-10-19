import {getConnection, sql, queries} from '../database';


export const getProveedorTipo =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getproveedorTipo)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getProveedorTipoId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getproveedorTipoId);
        
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

export const postProveedorTipo = async (req, res) => {
    
    const {productoServicio, descripcion} = req.body;

    if ( descripcion == null || descripcion == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    if ( productoServicio == null || productoServicio == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        await pool
                    .request()
                    .input("productoServicio", sql.VarChar, productoServicio)
                    .input("descripcion", sql.VarChar, descripcion)
                    .query(queries.postproveedorTipo);
        
        res.status(200).json({ msg: 'Ok: Insertar ok'})
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const putProveedorTipo = async (req, res) => {

    const {productoServicio,descripcion } = req.body;

    const{id} = req.params;

    if ( descripcion == null || descripcion == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    if ( productoServicio == null || productoServicio == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("id", sql.Int, id)
                .input("productoServicio", sql.VarChar, productoServicio)
                .input("descripcion", sql.VarChar, descripcion)
                .query(queries.putproveedorTipo);
        
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

export const deleteProveedorTipo = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.deleteproveedorTipo);
        
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