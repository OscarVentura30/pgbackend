/*import jwt from 'jsonwebtoken';*/

import {Router} from 'express';
import {loginIn, logoutProfile , homeView, loginView,indexView} from '../controllers/login.controller';
import {verifyToken} from '../helpers/verifyToken';

const router = Router();

router.post('/api/login', loginIn);

router.get('/api/logout',verifyToken, logoutProfile);

router.get('/',homeView);

router.get('/login', loginView );

router.get('/index', indexView )

export default router;


