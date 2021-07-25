import { getRoles } from './../controllers/roles';
import { Router } from 'express';

const router = Router();

router.post('/',                    getRoles);


export default router;