"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolesxpersonas_1 = require("./../controllers/rolesxpersonas");
const express_1 = require("express");
const rolesxpersonas_2 = require("../controllers/rolesxpersonas");
const router = express_1.Router();
router.post('/', rolesxpersonas_2.getRolesXpersonas);
router.post('/editar', rolesxpersonas_1.updateRolXpersona);
exports.default = router;
//# sourceMappingURL=rolesxpersonas.js.map