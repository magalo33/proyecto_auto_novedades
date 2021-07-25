"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const departamentos_1 = require("./../controllers/departamentos");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', departamentos_1.getDepartamentos);
router.post('/:id', departamentos_1.getDepartamento);
exports.default = router;
//# sourceMappingURL=departamentos%20copy.js.map