import {idUserToken} from '../helpers/tokenUser';
import {getConnection, sql, queries} from '../database';

export const ventasView = (req, res) => {

    const {cookies} = req ; 

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    res.render('ventas.index.hbs', {
        titulo: 'Ventas',
        sesionUser: user
    })
};

export const getVentas =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getVentas)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getVentaId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getVentasId);
        
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