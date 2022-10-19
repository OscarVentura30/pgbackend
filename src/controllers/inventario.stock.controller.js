import {getConnection, sql, queries} from '../database';


export const getStock =  async (req, res) => {
 
    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getStock)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getStockId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getStockId);
        
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

export const putStock = async (req, res) => {

    const {cantidad, vencimiento} = req.body;

    const{id} = req.params;

    if (cantidad < 0) {
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("id", sql.Int, id)
                .input("cantidad", sql.Int, cantidad)
                .input("vencimiento", sql.VarChar, vencimiento)
                .query(queries.putStockId);
        
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