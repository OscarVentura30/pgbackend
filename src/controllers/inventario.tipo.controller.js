import {getConnection, sql, queries} from '../database';


export const getTipo =  async (req, res) => {
 
    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getTipo)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getTipoId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getTipoId);
        
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

export const postTipo = async (req, res) => {
    
    const {descripcion} = req.body;

    if ( descripcion == null || descripcion == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        await pool
                    .request()
                    .input("descripcion", sql.VarChar, descripcion)
                    .query(queries.postTipo);
        
        res.status(200).json({ msg: 'Ok: Insertar ok'})
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const putTipo = async (req, res) => {

    const {descripcion} = req.body;

    const{id} = req.params;

    if (!descripcion || !id) {
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("id", sql.Int, id)
                .input("descripcion", sql.VarChar, descripcion)
                .query(queries.putTipo);
        
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

export const deleteTipo = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.deleteTipo);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: 'Error: Error al eliminar'});
        }

        res.status(200).json({ msg: 'Ok: Eliminar ok'})
        
    } catch (error) {

        res.status(500);
        res.send(error.message); 
        
    }
}