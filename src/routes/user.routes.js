import {Router} from 'express';
import {getUsuarios,newUsuario,getUserById,deleteUserById,getCountUsers,updateUserById} from '../controllers/user.controller';
import {verifyToken} from '../helpers/verifyToken';

const router = Router();

router.get('/usuarios',verifyToken,  getUsuarios); 

router.get('/usuarios/:id' ,verifyToken, getUserById);

router.get('/usuarioscount' ,verifyToken, getCountUsers); 

router.post('/usuarios' ,verifyToken,  newUsuario ); 

router.delete('/usuarios/:id' ,verifyToken, deleteUserById); 

router.put('/usuarios/:id' ,verifyToken, updateUserById); 

 

export default router; 