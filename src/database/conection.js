import sql from 'mssql';
import {config} from 'dotenv';
config();


const dbsettings = {
    user: process.env.DBUSER ,
    password: process.env.DBPASWORD,
    server: process.env.DBSERVER,
    database: process.env.DB,
    port: 1433 ,

    options:{
        
        trustServerCertificate: true
    }
    

}

export
async function getConnection(){

    try {

        const pool = await sql.connect(dbsettings);
        return pool;

    } catch (error){
        console.error(error);
    }

}

export {sql};


