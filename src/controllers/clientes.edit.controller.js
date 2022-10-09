import {getConnection, queries, sql} from '../database';
import {validateIdClient} from '../helpers/validateClient';
import {validarEmail, validarNombre} from '../helpers/validateData';


export const updateClientById = async (req, res) => {

    const { id } = req.params;

    if ( await (validateIdClient(id)) == false) {

        return res.status(400).json({ msg: 'Id de cliente no encontrado'});
    }

    const {nombre, nit, direccion, telefono, email, tipoClienteId} = req.body;

    if (nombre == null || nit == null ) {
        
        return res.status(400).json({ msg: 'No es posible guardar, faltan datos obligarotios'})
    }

    if(validarEmail(email) == false){

        return res.status(400).json({ msg: 'Correo invalido'})
    }

    if (validarNombre(nombre) == false) {

        return res.status(400).json({ msg: 'Nombre Invalido'})
    }

    try {

        const pool = await getConnection();

        const result = await pool
                            .request()
                            .input("id", id)
                            .input("nombre", sql.VarChar, nombre)
                            .input("nit", sql.VarChar, nit)
                            .input("direccion", sql.VarChar, direccion)
                            .input("telefono", sql.VarChar, telefono)
                            .input("email", sql.VarChar, email)
                            .input("tipoClienteId", sql.Int, tipoClienteId)
                            .query(queries.updateClientById);

        res.json ({msg: 'Status: 200 , actualizar ok'});

        
    } catch (error) {

        res.status(500);
        res.send(error.message + '/ Error al Actualizar ');
        
    }

};