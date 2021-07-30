export interface RolesXpersonasResponse{
    error: number;
    msg: string;
    rolesxpersonas: PersonaConRol[];
}

export interface PersonaConRol{
    idpersona: number,
    cedula: string,
    nombre: string,
    direccion: string,
    telefono: string,
    email: string,
    clave: string,
    activo: boolean,
    createdAt: string,
    updatedAt: string,
    idrol: number,
    descripcion: string,
    idrolesxpersona: number
}