import { GenericResponse } from './../../interfaces/genericresponse.interface';
import { SeguridadService } from './../../services/seguridad.service';
import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Entidades, EntidadInterface } from 'src/app/interfaces/entidades.interface';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { faCoffee,faEdit } from '@fortawesome/free-solid-svg-icons';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  faCoffee = faCoffee;
  faEdit = faEdit;
  entidades:EntidadInterface[];
  entidadSeleccionada:number;

  constructor(
    private seguridadService: SeguridadService,
    private backendService: BackendService,
    private utilitiesService: UtilitiesService
    ) { 
      this.entidadSeleccionada = 0;
      this.entidades = new Array();
      this.getEntidades();
    }

  ngOnInit(): void {
  }

  getEntidades(){    
    try{
      const body = { data: { token: this.seguridadService.getToken() } };
      const token = this.seguridadService.getEncrypt(body);
      
      this.backendService.getEntidades(body, token)
        .subscribe((resp: Entidades) => {
          const error = resp.error;
          if(error == 0){
            this.entidades = resp.entidades;
            this.entidades.forEach((item:EntidadInterface)=>{          
              
              let unix_timestamp = this.utilitiesService.toTimestamp(item.createdAt);
              var date = new Date(unix_timestamp * 1000);    
              let anio = date.getFullYear();
              let mes = (date.getMonth()+1).toString();
              let dia = date.getUTCDate().toString();
              if(mes.length==1){
                mes = '0'+mes;
              }
              if(dia.length==1){
                dia = '0'+dia;
              }
              item.createdAt = anio+"-"+mes+"-"+dia;
              let unix_timestamp2 = this.utilitiesService.toTimestamp(item.updatedAt);
              var date2 = new Date(unix_timestamp2 * 1000);    
              let anio2 = date2.getFullYear();
              let mes2 = (date2.getMonth()+1).toString();
              let dia2 = date2.getUTCDate().toString();
              if(mes2.length==1){
                mes2 = '0'+mes2;
              }
              if(dia2.length==1){
                dia2 = '0'+dia2;
              }
              item.updatedAt = anio2+"-"+mes2+"-"+dia2;
              
            });            
          }else{
            this.utilitiesService.fail(resp.msg);
          }
        }, (error) => {
          this.utilitiesService.fail('Error al tratar de obtener información del backend.');
        });
      
    }
    catch(error){
      this.utilitiesService.fail(error.toString());
    }
  }




 editarItem(entidad:EntidadInterface){
    this.entidadSeleccionada = entidad.identidad;
    const nitentidadeditar = (<HTMLInputElement>document.getElementById('nit-entidad-editar'));
    nitentidadeditar.value = entidad.nit;
    const nombreentidadeditar = (<HTMLInputElement>document.getElementById('nombre-entidad-editar'));
    nombreentidadeditar.value = entidad.nombre;
    const direccionentidadeditar = (<HTMLInputElement>document.getElementById('direccion-entidad-editar'));
    direccionentidadeditar.value = entidad.direccion;
    const telefonoentidadeditar = (<HTMLInputElement>document.getElementById('telefono-entidad-editar'));
    telefonoentidadeditar.value = entidad.telefono;
    const emailentidadeditar = (<HTMLInputElement>document.getElementById('email-entidad-editar'));
    emailentidadeditar.value = entidad.email;
    const activoentidadeditar = (<HTMLInputElement>document.getElementById('activo-entidad-editar'));
    if(entidad.activo){
      activoentidadeditar.value = '1';
    }else{
      activoentidadeditar.value = '2';
    }
    jQuery.noConflict();
    const mtac = document.getElementById('modal-editar');
    if(mtac){
      jQuery.noConflict();
      ($('#dialogo1') as any).modal('show');
    }
 }

  /*cierra modal*/
  closeModal(): void{
    ($('#dialogo1') as any).modal('hide');
    ($('#dialogo2') as any).modal('hide');
    this.vaciarRegistroEntidad();
  }

  edicionEntidadCargado(){    
    const nitentidadeditar = (<HTMLInputElement>document.getElementById('nit-entidad-editar'));
    const nombreentidadeditar = (<HTMLInputElement>document.getElementById('nombre-entidad-editar'));
    const direccionentidadeditar = (<HTMLInputElement>document.getElementById('direccion-entidad-editar'));
    const telefonoentidadeditar = (<HTMLInputElement>document.getElementById('telefono-entidad-editar'));
    const emailentidadeditar = (<HTMLInputElement>document.getElementById('email-entidad-editar'));
    const activoentidadeditar = (<HTMLInputElement>document.getElementById('activo-entidad-editar'));
    let estadoEntidad:boolean = true;
    if(activoentidadeditar.value == '2'){
      estadoEntidad = false;
    }
    let clave = (<HTMLInputElement>document.getElementById('password-entidad-editar'));

    let entidadRequest = {
      identidad:this.entidadSeleccionada,
      nombre:nombreentidadeditar.value,
      direccion:direccionentidadeditar.value,
      telefono:telefonoentidadeditar.value,
      nit:nitentidadeditar.value,
      email:emailentidadeditar.value,
      activo: estadoEntidad
    }

    if(this.validarEntidadRequest(entidadRequest,clave.value)){
      this.closeModal();
      try{
        const body = 
      { 
        data: 
        { 
          requestLogin: 
          { 
            idrol: this.utilitiesService.getIdrol(),
            cedula: this.utilitiesService.getCedula(),
            clave: this.seguridadService.getDataEncrypt( clave.value ) 
          },
          entidad: entidadRequest
        } 
      }; 
        const token = this.seguridadService.getEncrypt(body);
        clave.value = '';
        this.backendService.editarEntidad(body, token)
          .subscribe((response: GenericResponse) => {  
            if(response.error == 0){
              this.getEntidades();
            }else{
              this.utilitiesService.fail(response.msg);
            }
          }, (error) => {
            this.utilitiesService.fail('Error al tratar de obtener información del backend.');
          }); 
      }
      catch(error){
        this.utilitiesService.fail(error.toString());
      } 
    }else{
      this.utilitiesService.fail('Debe diligenciar todos los campos');
    }



      
  }


  crearNuevaEntidad(){
    jQuery.noConflict();
    const mtac = document.getElementById('registro-entidad');
    if(mtac){
      jQuery.noConflict();
      ($('#dialogo2') as any).modal('show');
    }
  }

  registroEntidadCargado(){
    try{

        const nitentidadregistrar =         (<HTMLInputElement>document.getElementById('nit-entidad-registrar')).value;
        const nombreentidadregistrar =      (<HTMLInputElement>document.getElementById('nombre-entidad-registrar')).value;
        const direccionentidadregistrar =   (<HTMLInputElement>document.getElementById('direccion-entidad-registrar')).value;
        const telefonoentidregistrar =      (<HTMLInputElement>document.getElementById('telefono-entidad-registrar')).value;
        const emailentidadregistrar =       (<HTMLInputElement>document.getElementById('email-entidad-registrar')).value;
        let clave =                         (<HTMLInputElement>document.getElementById('password-entidad-registrar')).value;

        let entidadRequest = {
          identidad:  0,
          nombre:     nombreentidadregistrar,
          direccion:  direccionentidadregistrar,
          telefono:   telefonoentidregistrar,
          nit:        nitentidadregistrar,
          email:      emailentidadregistrar,
          activo:     false
        };

 
        if(this.validarEntidadRequest(entidadRequest,clave)){
          const body = 
          { 
            data: 
            { 
              requestLogin: 
              { 
                idrol:  this.utilitiesService.getIdrol(),
                cedula: this.utilitiesService.getCedula(),
                clave:  this.seguridadService.getDataEncrypt( clave ) 
              },
              entidad:entidadRequest
            } 
          }; 

          const token = this.seguridadService.getEncrypt(body);
          clave = '';        
          this.closeModal();
          this.backendService.registrarEntidad(body, token)
            .subscribe((response: GenericResponse) => {  
              if(response.error == 0){              
                this.getEntidades();
              }else{              
                this.utilitiesService.fail(response.msg);
              }
            }, (error) => {          
              this.utilitiesService.fail('Error al tratar de obtener información del backend.');
            }); 
        }else{
          this.utilitiesService.fail('Debe diligenciar todos los campos');
        }
        
  }
  catch(error){
    this.utilitiesService.fail(error.toString());
  }   

  }


vaciarRegistroEntidad(){
  try{
    const nitentidadregistrar =         (<HTMLInputElement>document.getElementById('nit-entidad-registrar'));
    const nombreentidadregistrar =      (<HTMLInputElement>document.getElementById('nombre-entidad-registrar'));
    const direccionentidadregistrar =   (<HTMLInputElement>document.getElementById('direccion-entidad-registrar'));
    const telefonoentidregistrar =      (<HTMLInputElement>document.getElementById('telefono-entidad-registrar'));
    const emailentidadregistrar =       (<HTMLInputElement>document.getElementById('email-entidad-registrar'));
    let clave =                         (<HTMLInputElement>document.getElementById('password-entidad-registrar'));

    nitentidadregistrar.value =        '';
    nombreentidadregistrar.value =     '';
    direccionentidadregistrar.value =  '';
    telefonoentidregistrar.value =     '';
    emailentidadregistrar.value =      '';
    clave.value =                      '';
}catch(error){}
}


validarEntidadRequest(entidadRequest:any,clave:string):boolean{
  let ret:boolean = true;
  if (
    !(entidadRequest.nombre)  ||
    !(entidadRequest.direccion)  ||
    !(entidadRequest.telefono) ||
    !(entidadRequest.nit)  ||
    !(entidadRequest.email) ||
    !(clave)
    ){
      ret = false;
  }
  return ret;
}


}
