"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_1 = require("./../controllers/personas");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', personas_1.getPersonas);
router.post('/:id', personas_1.getPersona);
router.post('/porcedula/:cedula', personas_1.getPersonaPorCedula);
router.post('/pornombre/:nombre', personas_1.getPersonaPorNombre);
router.post('/poremail/:email', personas_1.getPersonaPorEmail);
router.post('/portelefono/:telefono', personas_1.getPersonaPorTelefono);
router.post('/actualizar/:item', personas_1.actualizarPersona);
exports.default = router;
//# sourceMappingURL=personas.js.map