import {Router} from 'express';
import {clientesView, getClientes,newClienteView,getTypeClient, getClientById, typeClientView} from '../controllers/clientes.controllers';
import {newClient} from '../controllers/clientes.nuevo.controllers';
import {deleteClientById} from '../controllers/clientes.borrar.controller';
import {updateClientById} from '../controllers/clientes.edit.controller';

const router = Router();

router.get('/clientes' , clientesView);

router.get('/api/clientes', getClientes);

router.get('/api/get-type-client', getTypeClient);

router.get('/clientes-nuevo', newClienteView);

router.get('/api/get-cliente/:id', getClientById);

router.get('/clientes-tipo', typeClientView);

router.post('/api/cliente-nuevo', newClient);

router.put('/api/update-client/:id', updateClientById)

router.delete('/api/delete-cliente/:id', deleteClientById);


export default router;