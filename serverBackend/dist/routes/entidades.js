"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entidades_1 = require("./../controllers/entidades");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', entidades_1.getEntidades);
router.post('/:id', entidades_1.getEntidad);
router.post('/pornit/:nit', entidades_1.getEntidadPorNit);
router.post('/pornombre/:nombre', entidades_1.getEntidadPorNombre);
router.post('/poremail/:email', entidades_1.getEntidadPorEmail);
router.post('/portelefono/:telefono', entidades_1.getEntidadPorTelefono);
router.post('/actualizar/:item', entidades_1.actualizarEntidad);
exports.default = router;
//# sourceMappingURL=entidades.js.map