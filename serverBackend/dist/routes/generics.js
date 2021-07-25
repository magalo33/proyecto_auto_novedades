"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generic_1 = require("./../controllers/generic");
const generic_2 = require("../controllers/generic");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', generic_2.token);
router.post('/validarlogin', generic_1.validarLogin);
exports.default = router;
//# sourceMappingURL=generics.js.map