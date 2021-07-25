import { validarLogin } from './../controllers/generic';
import { token } from '../controllers/generic';
import { Router } from 'express';

const router = Router();

router.post('/',token);
router.post('/validarlogin',validarLogin);

export default router;