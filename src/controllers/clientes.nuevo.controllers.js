import { pool } from 'mssql';
import {getConnection, sql, queries} from '../database';

export const newClient = async (req, res) => {

    const {nombre, nit, direccion, telefono, email, tipoClienteId} = req.body;

    try {

        const pool = await getConnection();

        await pool.request()
                            .input("nombre", sql.VarChar, nombre)
                            .input("nit", sql.VarChar, nit)
                            .input("direccion", sql.VarChar, direccion)
                            .input("telefono", sql.VarChar, telefono)
                            .input("email", sql.VarChar, email)
                            .input("tipoClienteId", sql.VarChar, tipoClienteId)
                            .query(queries.InsertClient);

        
        res.redirect ('/clientes');
        
    } catch (error) {
        res.status(500);
        res.send(error.message + ' ->  Error! no es posible guardar al cliente');
        
    }

}