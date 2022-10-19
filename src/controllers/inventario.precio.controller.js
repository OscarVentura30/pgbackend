import {getConnection, sql, queries} from '../database';

 
export const getPrecios =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getPrecios)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getPreciosId = async (req, res) => {

    const {idprecio} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("idprecio", sql.Int, idprecio)
                                .query(queries.getPreciosId);
        
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

export const postPrecio = async (req, res) => {
    
    const {productoId, contenidoId, precioVenta} = req.body;

    if ( productoId == null || productoId == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    if ( contenidoId == null || contenidoId == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    if ( precioVenta == null || precioVenta == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("productoId", sql.Int, productoId)
                    .input("contenidoId", sql.Int, contenidoId)
                    .input("precioVenta", sql.Numeric(18,2), precioVenta)
                    .query(queries.postPrecios);
        
        if (result.rowsAffected[0] == 1) {

            return res.status(200).json({ msg: 'Ok: Insertar ok'})
        }

        return res.status(400).json({ msg: 'Error: error al insertar, no se pemiten datos duplicados '});
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const putPrecio = async (req, res) => {

    const {precioVenta} = req.body;

    const{idprecio} = req.params;

    if (!precioVenta) {
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("idprecio", sql.Int, idprecio)
                .input("precioVenta", sql.Numeric(18,2), precioVenta)
                .query(queries.putPrecios);
        
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

export const deletePrecio = async (req, res) => {

    const {idprecio} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("idprecio", sql.Int, idprecio)
                                .query(queries.deletePrecios);
        
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