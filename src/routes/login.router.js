/*import jwt from 'jsonwebtoken';*/

import {Router} from 'express';
import {loginIn, logoutProfile} from '../controllers/login.controller';
import {verifyToken} from '../helpers/verifyToken';

const router = Router();

router.post('/login', loginIn);

router.get('/logout',verifyToken, logoutProfile)

export default router;


