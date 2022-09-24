import { pool } from 'mssql';
import {getConnection, sql, queries} from '../database';
import {encrypt,compare} from '../helpers/handleBcrypt';
import {config} from 'dotenv';
import { token } from 'morgan';

const jwt = require('jsonwebtoken'); 

export const loginIn = async (req, res) => {

    const {userName, password} =  req.body;

    if (userName == null || password == null) {

        return res.status(400).json({ msg: 'Falta el usuario o clave, datos vacios'});
        
    }

    try {

        const pool = await getConnection();

        const result = await pool.request()
                    .input("userName", sql.VarChar , userName)

                    .query(queries.loginUser);

        if (result.recordset[0] == null) {

            return res.status(404).json({msg : 'No existe el usuario o la clave es incorrecta'});
        }
        else{
            
            const comparar = await compare(password, result.recordset[0].password);

            console.log(comparar);

            if (comparar == 0) {

                return res.json("clave incorrecta");
                
            }
            else{

                const ttoken = jwt.sign({id: userName }, process.env.TEXTSECRET,{ expiresIn: 60*60*24});
                console.log(ttoken);
                res.json({auth: true, ttoken})
            }
            

        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};


export const logoutProfile = (req, res) => {

    const user = req.headers['x-access-token'];

    console.log(user);

    return res.json({auth: false, user});

};

export const homeView = (req, res) => {

    return res.render ('home', {
        user: 'oscar',
        titulo: 'Menú principal',
    });

};

export const loginView = (req , res) => {

    return res.render ('login');

};

export const indexView = (req, res) => {
    return res.render ('index', {
        titulo: 'Menu Principal',
        template: 'menu'
    });
}