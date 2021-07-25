import { getDepartamento, getDepartamentos } from './../controllers/departamentos';
import { Router } from 'express';

const router = Router();

router.post('/',     getDepartamentos);
router.post('/:id',  getDepartamento);


export default router;