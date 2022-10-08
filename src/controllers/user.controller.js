import { data } from 'jquery';
import { token } from 'morgan';
import {getConnection, sql, queries} from '../database';
import {encrypt,compare} from '../helpers/handleBcrypt';
import { validarNombre , validarEmail, validarPassword, validarNumero,validarUser, validarIdUsuario } from '../helpers/validateData';


export const getUsuarios =  async (req, res) => { 

    try {
        const pool = await getConnection(); 

        const result = await pool
                            .request()
                            .query(queries.getAllusers);
        

        res.json(result.recordset);
 
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const newUsuario = async (req, res) => {

    const {nombre , apellido, email, password, salario, rol, userName } = req.body;


    if( validarNombre(nombre) == false || validarNombre(apellido) == false){

        return res.status(400).json({ msg: 'Error: Nombre o apellido no valido'})
    }

    if ( validarEmail(email) == false ) {

        return res.status(400).json({ msg: 'Error: Email no valido'})
        
    }

    if(validarPassword(password) == false) {

        return res.status(400).json({ msg: 'Error: clave debe tener numeros y letras, 8 digitos'})
    }

    if (validarNumero(salario) == false ) {
        
        return res.status(400).json({ msg: 'Error: Salario no valido'})
    }

    if ( await validarUser(userName) == false) {

        return res.status(400).json({ msg: 'Error: Usuario del sistema no se debe repetir y debe tener al menos 5 carateres'})
    }

    const passwordHash = await encrypt(password);

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

        console.log('Crear nuevo Usuario ok ') ;
        res.redirect ('/usuarios');
        
    } catch (error) {
        res.status(500);
        res.send(error.message + 'El rol no existe ');
    }

};

export const getUserById = async (req, res) => {

    const { id } = req.params;

    try {

        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id" , id)
        .query(queries.getUserById); 

        if (result.recordset[0] == null) {

            res.json ('No se encuentra Usuario ')
        }

        /*res.send(result.recordset[0]);*/
        const datos = result.recordset[0];
        console.log(datos.userName);
        res.render('usuario.editar.hbs', {
            id: datos.id,
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
            salario: datos.salario,
            rol: datos.rol,
            usuario: datos.userName,

        } );
        
    } catch (error) {

        res.status(500);
        res.send(error.message + ' / no se econtro usuario ' + id );
        
    }

    

};

export const deleteUserById = async (req, res) => {

    const { id } = req.params;

    if ( await(validarIdUsuario(id)) == false) {
        
        return res.status(400).json({ msg: 'Id de usuario no existe, no es posible eliminar'})
    }

    try {

        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id" , id)
        .query(queries.deleteUserById); 

        res.status(204).json({ msg: 'Eliminar ok'});
        
    } catch (error) {

        res.status(500);
        res.send(error.message + 'Error al eliminar');
        
    }

    

};

export const getCountUsers = async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
        .request()
        .query(queries.getCountUsers); 

        res.json(result.recordset[0]['']);
        
    } catch (error) {

        res.status(500);
        res.send(error.message + 'Erro al contar');
        
    }

    

    

};

export const updateUserById = async (req, res ) => {

    const {nombre , apellido, email, password, salario, rol, userName } = req.body;

    const {id} = req.params;

    if( nombre == null || apellido == null ){

        return res.status(400).json({ msg: 'Falta Datos obligatorios'})
    }

    if ( await(validarIdUsuario(id)) == false) {
        
        return res.status(400).json({ msg: 'Id de usuario no existe'})
    }

    const passwordHash = await encrypt(password);

    try {

        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input("id" , id)
        .input("nombre" , sql.VarChar , nombre)
        .input("apellido", sql.VarChar , apellido)
        .input("email", sql.VarChar , email )
        .input("password", sql.VarChar, passwordHash)
        .input("salario" , sql.Numeric , salario)
        .input("rol" , sql.Int , rol)
        .input("userName", sql.VarChar , userName)
        .query(queries.updateUserById);
    
        res.json ({msg: 'Status: 200 , actualizar ok'});
        
    } catch (error) {
        
        res.status(500);
        res.send(error.message + '/ Error al Actualizar ');

    }


};


export const userView = (req, res) => {

    

    res.render('usuarios.index.hbs', {
        message: 'Pagina de usuarios',
    });

};

export const userNewView = (req, res) => {

    res.render('usuario.nuevo.hbs',{
        mensaje: "inicio"
    })

};

