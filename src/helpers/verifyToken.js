import {config} from 'dotenv';
const jwt = require('jsonwebtoken');


export const verifyToken = async (req, res, next) => {

    const {cookies} = req ;

    const tokenUser = cookies.xtoken;

    console.log(tokenUser);

    if (!tokenUser) {

        return res.status(401).json({
            auth : false ,
            message: 'No tiene autorizacion para esto'
        });
        
    }

    const decoded = jwt.verify(tokenUser, process.env.TEXTSECRET, (error, auth) => {
        if (error) {

            return res.status(403).json({
                auth : false ,
                message: 'Token Invalido'
            });
            
        } 
        else 
        {
            
            const dataToken = jwt.decode(tokenUser)
            console.log(dataToken);
            next();
        }
    });
    
}