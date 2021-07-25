import { getPersona, getPersonas, getPersonaPorCedula, getPersonaPorNombre, getPersonaPorEmail, getPersonaPorTelefono, actualizarPersona } from './../controllers/personas';
import { Router } from 'express';

const router = Router();

router.post('/',                        getPersonas);
router.post('/:id',                     getPersona);
router.post('/porcedula/:cedula',       getPersonaPorCedula);
router.post('/pornombre/:nombre',       getPersonaPorNombre);
router.post('/poremail/:email',         getPersonaPorEmail);
router.post('/portelefono/:telefono',   getPersonaPorTelefono);
router.post('/actualizar/:item',        actualizarPersona);

export default router;