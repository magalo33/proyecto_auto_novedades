import { getContactos } from './../controllers/contactos';
import { Router } from 'express';

const router = Router();

router.post('/',                    getContactos);


export default router;