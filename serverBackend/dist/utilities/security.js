"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = __importStar(require("crypto-js"));
class Security {
    constructor() {
        this.key = process.env.KEY || "";
    }
    getEncrypt(body) {
        body = JSON.stringify(body);
        return CryptoJS.AES.encrypt(body.trim(), this.key.trim()).toString();
    }
    getDeEncrypt(data) {
        return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, this.key, {
            keySize: 128 / 8,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })));
    }
}
exports.default = Security;
//# sourceMappingURL=security.js.map