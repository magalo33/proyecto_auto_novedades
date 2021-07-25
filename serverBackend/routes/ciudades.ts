import { getCiudad, getCiudades, getCiudadPorDepartamento } from './../controllers/ciudades';
import { Router } from 'express';

const router = Router();

router.post('/',                    getCiudades);
router.post('/:id',                 getCiudad);
router.post('/porDepartamento/:id', getCiudadPorDepartamento);


export default router;