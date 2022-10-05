import app from './app';
import Swal from 'sweetalert2'

/* rutas */

import usuarioRutas from './routes/user.routes';
import loginRutas from './routes/login.router';


/*
import {getConnection} from './database/conection';*/


app.use(loginRutas);
app.use(usuarioRutas);
app.use(Swal);


async function init() {

    await app.listen(app.get('port'));

    console.log('servidor en puerto',app.get('port'));
    
}


init();