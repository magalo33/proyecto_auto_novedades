"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLogin = void 0;
class RequestLogin {
    constructor(idrol_param, cedula_param, password_param) {
        this.idrol = idrol_param;
        this.cedula = cedula_param;
        this.password = password_param;
    }
    getIdrol() {
        return this.idrol;
    }
    getCedula() {
        return this.cedula;
    }
    getPassword() {
        return this.password;
    }
    requestLogin() {
        console.log(this);
    }
}
exports.RequestLogin = RequestLogin;
//# sourceMappingURL=requestlogin.js.map