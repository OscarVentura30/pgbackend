import app from './app';

/* rutas */

import usuarioRutas from './routes/user.routes';
import loginRutas from './routes/login.router';


/*
import {getConnection} from './database/conection';*/


app.use(loginRutas);
app.use(usuarioRutas);


async function init() {

    await app.listen(app.get('port'));

    console.log('servidor en puerto',app.get('port'));
    
}


init();