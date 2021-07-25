"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contactos_1 = require("./../controllers/contactos");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', contactos_1.getContactos);
exports.default = router;
//# sourceMappingURL=contactos.js.map