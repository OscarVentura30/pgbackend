import {getConnection, sql, queries} from '../database';


export const getProdProv =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getproductosprov)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getProdProvTableId =  async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .query(queries.getproductosprovCode)
        
        res.json(result.recordset);
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const getProdProvId = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.getproductosprovId);
        
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

export const postProdProv = async (req, res) => {
    
    const {productoId, proveedorId, precioCompra, plazoDias} = req.body;

    try {

        const pool = await getConnection();

        const result = await pool
                    .request()
                    .input("productoId", sql.Int, productoId)
                    .input("proveedorId", sql.Int, proveedorId)
                    .input("precioCompra", sql.Numeric(18,2), precioCompra)
                    .input("plazoDias", sql.Int, plazoDias)
                    .query(queries.postproductosprov);
        
        if (result.rowsAffected[0] == 1) {

            return res.status(200).json({ msg: 'Ok: Insertar ok'})
        }

        return res.status(400).json({ msg: 'Error: error al insertar, no se pemiten datos duplicados '});
        
        
    } catch (error) {

        res.status(500);
        res.send(error.message);
        
    }
};

export const putProdProv = async (req, res) => {

    const {precioCompra, plazoDias} = req.body;

    const{id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                .request()
                .input("id", sql.Int, id)
                .input("precioCompra", sql.Numeric(18,2), precioCompra)
                .input("plazoDias", sql.Int, plazoDias)
                .query(queries.putproductosprov);
        
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

export const deleteProdProv = async (req, res) => {

    const {id} = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
                                .request()
                                .input("id", sql.Int, id)
                                .query(queries.deleteproductosprov);
        
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
