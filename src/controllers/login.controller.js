import { pool } from 'mssql';
import {getConnection, sql, queries} from '../database';
import {encrypt,compare} from '../helpers/handleBcrypt';
import {idUserToken} from '../helpers/tokenUser';
import {config} from 'dotenv';
import { token } from 'morgan';
import {serialize} from 'cookie';

const jwt = require('jsonwebtoken'); 

export const loginIn = async (req, res) => {

    const {cookies} = req;

    if ('xtoken' in cookies) {

        return res.render('index', {
            message: 'Existe sesion Actual'
        })
        
    }

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

                
                /*
                const serialized =  serialize('x-access-token', ttoken , {
                    httpOnly: true,
                    sameSite: 'strict',
                    
                    maxAge:60*60*24 ,   
                    path: '/login'
                    
                });

                console.log(serialized);

                res.setHeader('Set-Cookie', serialized );
                */

                res.cookie('xtoken', ttoken);

                /*

                res.json({auth: true, ttoken});*/

                res.redirect ('/index');
            }
            

        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
};


export const logoutProfile = (req, res) => {

    res.clearCookie('xtoken');

    return res.render('home' ,{
        message: 'Cerrar sesion ok'
    });

};

export const homeView = (req, res) => {

    return res.render ('home', {
        user: 'oscar',
        titulo: 'Menú principal',
    });

};

export const loginView = (req , res) => {

    const {cookies} = req;

    if ('xtoken' in cookies) {

        const tokenUser = cookies.xtoken;

        const user = idUserToken(tokenUser);


        return res.render('index', {
            titulo: 'Menu Principal',
            message: 'Existe sesion Actual',
            sesionUser: user
        })
        
    }

    return res.render ('login');

};

export const indexView = (req, res) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    const user = idUserToken(tokenUser);
    
    return res.render ('index', {
        titulo: 'Menu Principal',
        template: 'menu',
        sesionUser: user
    });
}