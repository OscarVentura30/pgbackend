import {getConnection, sql, queries} from '../database';
import {idUserToken} from '../helpers/tokenUser';

export const clientesView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    return res.render('cliente.index.hbs', {
        titulo: 'clientes',
        sesionUser: user
    })

};

export const newClienteView = (req, res)=> {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    return res.render('cliente.nuevo.hbs', {
        titulo: 'clientes',
        sesionUser: user
    })

}

export const getClientes = async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getAllClient);

        res.json(result.recordset);
        
    } catch (error) {
        res.status(500);
        res.send(error.message)
        
    }

};

export const getTypeClient = async (req, res) => {3

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getTypeClient);

        res.json(result.recordset);

        
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }

}
