export interface RolesXpersonasResponse{
    error: number;
    msg: string;
    rolesxpersonas: PersonaConRol[];
}

export interface PersonaConRol{
    idpersona: string,
    cedula: string,
    nombre: string,
    direccion: string,
    telefono: string,
    email: string,
    clave: string,
    activo: boolean,
    createdAt: string,
    updatedAt: string,
    idrol: string,
    descripcion: string,
    idrolesxpersona: string
}