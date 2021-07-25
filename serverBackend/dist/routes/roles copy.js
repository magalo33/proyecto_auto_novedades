"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = require("./../controllers/roles");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', roles_1.getRoles);
exports.default = router;
//# sourceMappingURL=roles%20copy.js.map