export interface Personas{
  error: number,
  msg: string,
  personas: Persona[]
}

export interface Persona{
    idpersona:number,
    cedula:string,
    nombre:string,
    direccion:string,
    telefono:string,
    email:string,
    clave:string,
    createdAt:string,
    updatedAt:string,
    activo: boolean
  }