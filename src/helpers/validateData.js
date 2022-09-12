import {getConnection, sql, queries} from '../database';


const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const numeroRegex = /^[0-9]*$/;


export const validarNombre = (text)=> {

    if(text == null){

        return false;
    }

    if (text.length <= 2) {

        console.log('error: longitud nombre o apeliido invalido, al menos 3 caracteres');
        return false
    }

    if ( (text.split(" ").join("")).length <= 3) {

        console.log('error: nombre o apellido invalido');
        return false
        
    }


    return true; 

};

export const validarEmail = (text) => {

    if(text == null){

        return true;
    }

    if (emailRegex.test(text)) {

        return true;
        
    } 
    else 
    {

        return false;
        
    }


};

export const validarPassword = (text) => {

    if (text == null) {

        console.log('password vacio');

        return false
    }

    if (text.length <= 7) {

        console.log('longitud de clave invalida, al menos 8 caracteres');
        return false
    }

    if ( (text.split(" ").join("")).length <= 7) {

        console.log('password invalido');
        return false
        
    }

    if((text.match(/[A-z]/)) == false ){

        console.log('la clave debe tener al menos 1 letra');
        return false

    }

    if (text.match(/\d/)== false) {

        console.log('la clave debe tener al menos un numero');
        return false
        
    }

};

export const validarNumero = (numero) => {
    if (numero == null) {

        return true;
        
    }

    if (numeroRegex.test(numero)) {
        
        return true;
    }
    else
    {
        return false;

    }

};

export const validarUser = async (user) => {

    if (user == null) {

        console.log('Error: userName vacio');
        return false;
        
    }

    if (user.length <= 4) {

        console.log('logitud UserName invalida, debe tener al menos 5 caracteres');
        return false
    }

    if ( (user.split(" ").join("")).length <= 4) {

        console.log('UserName invalido, ');
        return false
        
    }

    try {

    const pool = await getConnection();

    const result = await pool.request()
                        .input("userName", sql.VarChar , user)
                        .query(queries.validateUser);

    console.log(result.recordset[0]);

    if (result.recordset[0] == null) {

        return true;
        
    } else {

        console.log('usuario existe en el sistema, no se debe repetir');
        return false;
        
    }
    } catch (error) {

        console.log('error interno, estatus 500');
        console.log(error);
        return false;
        
    }

};

export const validarIdUsuario = async (id) => {

    if (id == null || id == "") {

        return false;
        
    }

    try {

        const pool = await getConnection();

        const result = await pool.request()
                            .input("id", sql.Int , id)
                            .query(queries.validateIdUser);

        if (result.recordset[0].id == id) {

            return true

        }

        return false

        
    } catch (error) {

        console.log('error interno 500, no es posible validar id');
        console.log(error);
        return false;
        
    }

}


