import { getEntidad, getEntidades, getEntidadPorEmail, getEntidadPorNit, getEntidadPorNombre, getEntidadPorTelefono, actualizarEntidad } from './../controllers/entidades';
import { Router } from 'express';

const router = Router();

router.post('/',                        getEntidades);
router.post('/:id',                     getEntidad);
router.post('/pornit/:nit',             getEntidadPorNit);
router.post('/pornombre/:nombre',       getEntidadPorNombre);
router.post('/poremail/:email',         getEntidadPorEmail);
router.post('/portelefono/:telefono',   getEntidadPorTelefono);
router.post('/actualizar/:item',        actualizarEntidad);

export default router;