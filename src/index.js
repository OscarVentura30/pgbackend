import app from './app';

/* rutas */

import usuarioRutas from './routes/user.routes';
import loginRutas from './routes/login.router';
import clienteRutas from './routes/cliente.router';


/*
import {getConnection} from './database/conection';*/


app.use(loginRutas);
app.use(usuarioRutas);
app.use(clienteRutas);


async function init() {

    await app.listen(app.get('port'));

    console.log('servidor en puerto',app.get('port'));
    
}


init();