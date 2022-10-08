import {getConnection, sql, queries} from '../database';

export const validateIdClient = async (id) => {

    if (id == null || id == "") {

        return false;
        
    }

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.validateIdClient);

        if (result.recordset[0] == null) {

            return false;
            
        }
        
        if (result.recordset[0].id == id) {

            return true;

        }

        return false
        
    } catch (error) {

        console.log('error interno 500, no es posible validar id de cliente');
        console.log(error);
        return false;      
    }

};