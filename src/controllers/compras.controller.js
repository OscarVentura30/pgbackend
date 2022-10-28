import {idUserToken} from '../helpers/tokenUser';
import {getConnection, sql, queries} from '../database';

export const comprasView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('compras.index.hbs', {
        titulo: 'compras',
        sesionUser: user
    })
};

export const comprasRegistrarView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('compras.registrar.hbs', {
        titulo: 'compras-registrar',
        sesionUser: user
    })
};

export const postCompra1 = async (req, res) => {

    const {userName, descripcion, importe} = req.body;

    const{id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("userName", sql.VarChar, userName)
                .input("descripcion", sql.VarChar, descripcion)
                .input("importe", sql.Numeric(18,2), importe)
                .query(queries.postCompras1);
        
        res.json(result.recordset);
                        
    } catch (error) {

        res.status(500);
        res.send(error.message); 
        
    }

};


export const postCompra2 = async (req, res) => {
    
    const {compraId, productoId, fechaVencimiento, entrada} = req.body;

    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("compraId", sql.Int , compraId)
                    .input("productoId", sql.Int, productoId)
                    .input("fechaVencimiento", sql.VarChar, fechaVencimiento)
                    .input("entrada", sql.Int, entrada)
                    .query(queries.postCompra2);
        
        res.status(200).json({ msg: 'Ok: Insertar ok'})
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getCompras =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getCompras)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getComprasId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getComprasId);
        
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