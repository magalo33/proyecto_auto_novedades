"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departamentos_1 = __importDefault(require("../routes/departamentos"));
const ciudades_1 = __importDefault(require("../routes/ciudades"));
const roles_1 = __importDefault(require("../routes/roles"));
const contactos_1 = __importDefault(require("../routes/contactos"));
const personas_1 = __importDefault(require("../routes/personas"));
const entidades_1 = __importDefault(require("../routes/entidades"));
const rolesxpersonas_1 = __importDefault(require("../routes/rolesxpersonas"));
const generics_1 = __importDefault(require("../routes/generics"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../bd/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            departamentos: '/api/v1/departamentos',
            generics: '/api/v1/token',
            ciudades: '/api/v1/ciudades',
            roles: '/api/v1/roles',
            contactos: '/api/v1/contactos',
            personas: '/api/v1/personas',
            entidades: '/api/v1/entidades',
            getRolesXpersonas: '/api/v1/rolesxpersonas'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.conectionDb();
        //metodos iniciales
        this.middlewares();
        //rutas de la app
        this.routes();
    }
    conectionDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('base de datos conectada');
            }
            catch (error) {
                console.log('orror');
                console.log(error);
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //lectura del body
        this.app.use(express_1.default.json());
        //acceso a carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto---> ' + this.port);
        });
    }
    routes() {
        this.app.use(this.apiPaths.departamentos, departamentos_1.default);
        this.app.use(this.apiPaths.ciudades, ciudades_1.default);
        this.app.use(this.apiPaths.roles, roles_1.default);
        this.app.use(this.apiPaths.contactos, contactos_1.default);
        this.app.use(this.apiPaths.generics, generics_1.default);
        this.app.use(this.apiPaths.personas, personas_1.default);
        this.app.use(this.apiPaths.entidades, entidades_1.default);
        this.app.use(this.apiPaths.getRolesXpersonas, rolesxpersonas_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map