import {getConnection, sql, queries} from '../database';
import {idUserToken} from '../helpers/tokenUser';
import {validateIdClient} from '../helpers/validateClient';

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

};

export const typeClientView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);

    return res.render('clientes.tipo.hbs', {
        titulo: 'clientes',
        sesionUser: user
    })
    
};

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

export const getClientById = async (req, res) => {

    const { id } = req.params;

    if (await (validateIdClient(id)) == false) {

        return res.status(400).json({ msg: 'Error Id de cliente no encontrado'});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                            .request()
                            .input("id", id)
                            .query(queries.getClientById)

        if(result.recordset[0] == null ){
            res.json ('Error no se encontro Cliente')
        }

        /*res.send(result.recordset[0]);*/

        const {cookies} = req ;

        const tokenUser = cookies.xtoken;

        const user = idUserToken(tokenUser);


        const datos = result.recordset[0];

        res.render('cliente.edit.hbs', {
            id: datos.id,
            nombre: datos.nombre,
            nit: datos.nit,
            direccion: datos.direccion,
            telefono: datos.telefono,
            email: datos.email,
            tipoClienteId: datos.tipoClienteId,
            sesionUser: user

        })

        
    } catch (error) {

        res.status(500);
        res.send(error.message + ' / no se econtro Cliente =  ' + id );
        
    }




}

export const getTypeClient = async (req, res) => {

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
