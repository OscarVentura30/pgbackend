import { token } from 'morgan';
import {getConnection, sql, queries} from '../database';
import {encrypt,compare} from '../helpers/handleBcrypt';


export const getUsuarios =  async (req, res) => { 
    

    try {
        const pool = await getConnection();

        const result = await pool
                            .request()
                            .query(queries.getAllusers);
        console.log(result);

        res.json(result.recordset);
 
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const newUsuario = async (req, res) => {

    const {nombre , apellido, email, password, salario, rol, userName } = req.body;

    const passwordHash = await encrypt(password);


    if( nombre == null || apellido == null ){

        return res.status(400).json({ msg: 'Falta Datos'})
    }

    console.log(nombre, apellido, email, passwordHash, salario, rol, userName );

    try {

        const pool = await getConnection();

        await pool.request()
                .input("nombre" , sql.VarChar , nombre)
                .input("apellido", sql.VarChar , apellido)
                .input("email", sql.VarChar , email )
                .input("password", sql.VarChar, passwordHash)
                .input("salario" , sql.Numeric , salario)
                .input("rol" , sql.Int , rol)
                .input("userName", sql.VarChar , userName)
                .query(queries.InsertNewUser);

        res.json ('Crear nuevo Usuario ok ')
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

};

export const getUserById = async (req, res) => {

    const { id } = req.params;

    const pool = await getConnection();

    const result = await pool
    .request()
    .input("id" , id)
    .query(queries.getUserById); 

    res.send(result.recordset[0]);

};

export const deleteUserById = async (req, res) => {

    const { id } = req.params;

    const pool = await getConnection();

    const result = await pool
    .request()
    .input("id" , id)
    .query(queries.deleteUserById); 

    res.sendStatus(204);

};

export const getCountUsers = async (req, res) => {

    const pool = await getConnection();

    const result = await pool
    .request()
    .query(queries.getCountUsers); 

    res.json(result.recordset[0]['']);

    

};

export const updateUserById = async (req, res ) => {

    const {nombre , apellido, email, password, salario, rol, userName } = req.body;
    const {id} = req.params;

    if( nombre == null || apellido == null ){

        return res.status(400).json({ msg: 'Falta Datos'})
    }

    const pool = await getConnection();
    
    const result = await pool
    .request()
    .input("id" , id)
    .input("nombre" , sql.VarChar , nombre)
    .input("apellido", sql.VarChar , apellido)
    .input("email", sql.VarChar , email )
    .input("password", sql.VarChar, password)
    .input("salario" , sql.Numeric , salario)
    .input("rol" , sql.Int , rol)
    .input("userName", sql.VarChar , userName)
    .query(queries.updateUserById);

    res.json ({nombre , apellido, email, password, salario, rol, userName });

};

