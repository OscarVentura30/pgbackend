import {getConnection, sql, queries} from '../database';


export const getUnidad =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getUnidades)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getUnidadId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getUnidadesId);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: 'Error 400: No se encuentra recurso'});
        }

        res.json(result.recordset);

    } catch (error) {
        
        res.status(500);
        res.send(error.message);
    }
};

export const postUnidad = async (req, res) => {
    
    const {descripcion, valorUnitario} = req.body;

    if ( descripcion == null || descripcion == "") {
        
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        await pool
                    .request()
                    .input("descripcion", sql.VarChar, descripcion)
                    .input("valorUnitario", sql.Int , valorUnitario)
                    .query(queries.postUnidades);
        
        res.status(200).json({ msg: 'Ok: Insertar ok'})
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const putUnidad = async (req, res) => {

    const {descripcion, valorUnitario} = req.body;

    const{id} = req.params;

    if (!descripcion || descripcion == "") {
        return res.status(400).json({ msg: 'Error: datos invalidos '});
    }

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("id", sql.Int, id)
                .input("descripcion", sql.VarChar, descripcion)
                .input("valorUnitario", sql.Int , valorUnitario)
                .query(queries.putUnidades);
        
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

export const deleteUnidad = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.deleteUnidades);
        
        if (result.rowsAffected == 0)
        {
            return res.status(400).json({ msg: '400 Error: Error al eliminar'});
        }

        res.status(200).json({ msg: '200 Ok: Eliminar ok'})
        
    } catch (error) {

        res.status(500);
        res.send(error.message); 
        
    }
}