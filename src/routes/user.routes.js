import {Router} from 'express';
import {getUsuarios,newUsuario,getUserById,deleteUserById,getCountUsers,updateUserById,userView,userNewView } from '../controllers/user.controller';
import {verifyToken} from '../helpers/verifyToken';

const router = Router();

router.get('/api/usuarios',verifyToken,  getUsuarios); 

router.get('/api/usuarios/:id' ,verifyToken, getUserById);

router.get('/api/usuarioscount' ,verifyToken, getCountUsers); 

router.post('/api/usuarios' ,verifyToken,  newUsuario ); 

router.delete('/api/usuarios/:id' ,verifyToken, deleteUserById); 

router.put('/api/usuarios/:id' ,verifyToken, updateUserById);

router.get('/usuarios', verifyToken ,userView);

router.get('/user-new', userNewView);

export default router; 