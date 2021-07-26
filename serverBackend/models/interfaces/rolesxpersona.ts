import { PersonaInterface } from "./persona.interface";
import { Rol } from "./rol.interface";

export interface RolesXpersona{
    error: number;
    msg: string;
    rolesxpersona: RolXpersona[];
}


export interface RolXpersona{
    idrolesxpersona: number,
    idrol: number,
    idpersona: number,
    rol: Rol,
    persona: PersonaInterface
}