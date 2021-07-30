import { updateRolXpersona } from './../controllers/rolesxpersonas';
import { Router } from 'express';
import { getRolesXpersonas } from '../controllers/rolesxpersonas';

const router = Router();

router.post('/',                    getRolesXpersonas);
router.post('/editar',              updateRolXpersona);


export default router;