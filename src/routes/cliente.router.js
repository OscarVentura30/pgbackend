import {Router} from 'express';
import {clientesView, getClientes,newClienteView,getTypeClient} from '../controllers/clientes.controllers';
import {newClient} from '../controllers/clientes.nuevo.controllers';
import {deleteClientById} from '../controllers/clientes.borrar.controller';

const router = Router();

router.get('/clientes' , clientesView);

router.get('/api/clientes', getClientes);

router.get('/api/get-type-client', getTypeClient);

router.get('/clientes-nuevo', newClienteView);

router.post('/api/cliente-nuevo', newClient);

router.delete('/api/delete-cliente/:id', deleteClientById)


export default router;