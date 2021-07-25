import express,{Application} from "express";
import departamentosRoutes from '../routes/departamentos';
import ciudadesRoutes from '../routes/ciudades';
import rolesRoutes from '../routes/roles';
import contactosRoutes from '../routes/contactos';
import personasRoutes from '../routes/personas';
import entidadesRoutes from '../routes/entidades';
import genericRoutes from '../routes/generics';
import cors from 'cors';
import db from "../bd/connection";


class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        departamentos: '/api/v1/departamentos',
        generics: '/api/v1/token',
        ciudades: '/api/v1/ciudades',
        roles: '/api/v1/roles',
        contactos: '/api/v1/contactos',
        personas: '/api/v1/personas',
        entidades: '/api/v1/entidades'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.conectionDb();
        //metodos iniciales
        this.middlewares();
        //rutas de la app
        this.routes();
    }

    async conectionDb(){
        try{
            await db.authenticate();
            console.log('base de datos conectada');
        }catch( error ){
            console.log('orror');
            console.log(error);
            throw new Error( error );
        }
    }

    middlewares(){
        //CORS
        this.app.use( cors() );
        //lectura del body
        this.app.use( express.json() );
        //acceso a carpeta publica
        this.app.use( express.static('public') );
    }


    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en el puerto---> '+ this.port);
        })
    }

    routes(){
        this.app.use( this.apiPaths.departamentos,departamentosRoutes);
        this.app.use( this.apiPaths.ciudades,ciudadesRoutes);
        this.app.use( this.apiPaths.roles,rolesRoutes);        
        this.app.use( this.apiPaths.contactos,contactosRoutes);    
        this.app.use( this.apiPaths.generics,genericRoutes);    
        this.app.use( this.apiPaths.personas,personasRoutes);    
        this.app.use( this.apiPaths.entidades,entidadesRoutes);    
    }
}

export default Server;