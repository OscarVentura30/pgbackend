import {Router} from 'express';
import {getUsuarios,newUsuario,getUserById,deleteUserById,getCountUsers,updateUserById} from '../controllers/user.controller';
import {verifyToken} from '../helpers/verifyToken';

const router = Router();

router.get('/usuarios', verifyToken, getUsuarios); 

router.get('/usuarios/:id' , getUserById);

router.get('/usuarioscount' , getCountUsers); 

router.post('/usuarios' , newUsuario ); 

router.delete('/usuarios/:id' , deleteUserById); 

router.put('/usuarios/:id' , updateUserById); 

 

export default router; 