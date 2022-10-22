import {idUserToken} from '../helpers/tokenUser';
import {getConnection, sql, queries} from '../database';

export const cajaView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('caja.index.hbs', {
        titulo: 'caja',
        sesionUser: user
    })
};

export const postVenta1 = async (req, res) => {
    
    const {clienteId, userName, importe} = req.body;

    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("clienteId", sql.Int , clienteId)
                    .input("userName", sql.VarChar, userName)
                    .input("importe", sql.Numeric(18,2), importe)
                    .query(queries.postVenta1);
        
        /*res.status(200).json({ msg: 'Ok: Insertar ok'})*/

        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const postVenta2 = async (req, res) => {
    
    const {ventaId, productoId, salida} = req.body;

    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("ventaId", sql.Int , ventaId)
                    .input("productoId", sql.Int, productoId)
                    .input("salida", sql.Int, salida)
                    .query(queries.postVenta2);
        
        res.status(200).json({ msg: 'Ok: Insertar ok'})
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};