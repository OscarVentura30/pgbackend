import {getConnection, queries, sql} from '../database';
import {validateIdClient} from '../helpers/validateClient';

export const deleteClientById = async (req, res) => {

    const { id } = req.params;

    if ( await(validateIdClient(id)) == false ) {

        return res.status(400).json({ msg: 'Id de cliente no existe, no es posible eliminar'})
        
    }

    try {
        
        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", id)
                                .query(queries.deleteClientById);

        res.status(204).json({ msg: 'Eliminar Cliente ok'});
        

    } catch (error) {

        res.status(500);
        res.send(error.message + 'Error al eliminar Cliente');
        
    }

};