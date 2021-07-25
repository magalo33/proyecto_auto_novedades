"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ciudades_1 = require("./../controllers/ciudades");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', ciudades_1.getCiudades);
router.post('/:id', ciudades_1.getCiudad);
router.post('/porDepartamento/:id', ciudades_1.getCiudadPorDepartamento);
exports.default = router;
//# sourceMappingURL=ciudades.js.map