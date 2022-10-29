import app from './app';

/* rutas */

import usuarioRutas from './routes/user.routes';
import loginRutas from './routes/login.router';
import clienteRutas from './routes/cliente.router';
import inventarioRutas from './routes/inventario.router';
import ventasRutas from './routes/ventas.routes';
import cajaRutas from './routes/caja.routes';
import comprasRutas from './routes/compras.routes';
import facturaCompras from './routes/factura.routes';


/*
import {getConnection} from './database/conection';*/


app.use(loginRutas);
app.use(usuarioRutas);
app.use(clienteRutas);
app.use(inventarioRutas);
app.use(ventasRutas);
app.use(cajaRutas)
app.use(comprasRutas);
app.use(facturaCompras);

async function init() {

    await app.listen(app.get('port'));

    console.log('servidor en puerto',app.get('port'));
    
}


init();