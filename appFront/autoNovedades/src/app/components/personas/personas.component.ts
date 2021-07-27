import { Component, OnInit } from '@angular/core';
import { Persona, Personas } from 'src/app/interfaces/persona.interface';
import { BackendService } from 'src/app/services/backend.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import * as jQuery from 'jquery';
import { GenericResponse } from 'src/app/interfaces/genericresponse.interface';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  faEdit = faEdit;
  personas:Persona[];
  personaSeleccionada:number=0;

  constructor(
    private seguridadService: SeguridadService,
    private backendService: BackendService,
    private utilitiesService: UtilitiesService
  ) { 
    this.personas = new Array();
    this.getPersonas();
  }

  ngOnInit(): void {
  }



  crearNuevaPersona(){
    jQuery.noConflict();
    const mtac = document.getElementById('modal-registro-persona');
    if(mtac){
      jQuery.noConflict();
      ($('#dialogo2-persona') as any).modal('show');
    }
  }


  getPersonas(){    
    try{
      const body = { data: { token: this.seguridadService.getToken() } };
      const token = this.seguridadService.getEncrypt(body);
      
      this.backendService.getPersonas(body, token)
        .subscribe((resp: Personas) => {
          const error = resp.error;
          if(error == 0){
            this.personas = resp.personas;
            this.personas.forEach((item:Persona)=>{          
              
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

  editarPersona(persona:Persona){

    this.personaSeleccionada = persona.idpersona;
    const cedulapersonaeditar = (<HTMLInputElement>document.getElementById('cedula-persona-editar'));
    cedulapersonaeditar.value = persona.cedula;
    const nombrepersonaeditar = (<HTMLInputElement>document.getElementById('nombre-persona-editar'));
    nombrepersonaeditar.value = persona.nombre;
    const direccionpersonaeditar = (<HTMLInputElement>document.getElementById('direccion-persona-editar'));
    direccionpersonaeditar.value = persona.direccion;
    const telefonopersonaeditar = (<HTMLInputElement>document.getElementById('telefono-persona-editar'));
    telefonopersonaeditar.value = persona.telefono;
    const emailpersonaeditar = (<HTMLInputElement>document.getElementById('email-persona-editar'));
    emailpersonaeditar.value = persona.email;
    const activopersonaeditar = (<HTMLInputElement>document.getElementById('activo-persona-editar'));
    if(persona.activo){
      activopersonaeditar.value = '1';
    }else{
      activopersonaeditar.value = '2';
    }



    jQuery.noConflict();
    const mtac = document.getElementById('modal-editar-persona');
    if(mtac){
      jQuery.noConflict();
      ($('#dialogo1-persona') as any).modal('show');
    }
  }


    /*cierra modal*/
    closeModalPersona(): void{
      ($('#dialogo1-persona') as any).modal('hide');
      ($('#dialogo2-persona') as any).modal('hide');
    }


    edicionPersonaCargado(){
      const cedulapersonaeditar     = (<HTMLInputElement>document.getElementById('cedula-persona-editar'));
      const nombrepersonaeditar     = (<HTMLInputElement>document.getElementById('nombre-persona-editar'));
      const direccionpersonaeditar  = (<HTMLInputElement>document.getElementById('direccion-persona-editar'));
      const telefonopersonaeditar   = (<HTMLInputElement>document.getElementById('telefono-persona-editar'));
      const emailpersonaeditar      = (<HTMLInputElement>document.getElementById('email-persona-editar'));
      const activopersonaeditar     = (<HTMLInputElement>document.getElementById('activo-persona-editar'));
      let estadoEntidad:boolean     = true;
      if(activopersonaeditar.value == '2'){
        estadoEntidad = false;
      }
      let clave = (<HTMLInputElement>document.getElementById('password-persona-editar'));
      let personaRequest = {
        idpersona:  this.personaSeleccionada,
        nombre:     nombrepersonaeditar.value,
        direccion:  direccionpersonaeditar.value,
        telefono:   telefonopersonaeditar.value,
        cedula:     cedulapersonaeditar.value,
        email:      emailpersonaeditar.value,
        activo:     estadoEntidad
      }
  
      if(this.validarPersonaRequest(personaRequest,clave.value)){
        this.closeModalPersona();
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
            persona: personaRequest
          } 
        }; 
          const token = this.seguridadService.getEncrypt(body);
          clave.value = '';
          this.backendService.editarPersona(body, token)
            .subscribe((response: GenericResponse) => {  
              if(response.error == 0){
                this.getPersonas();
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


    validarPersonaRequest(personaRequest:any,clave:string):boolean{
      let ret:boolean = true;
      if (
        !(personaRequest.nombre)  ||
        !(personaRequest.direccion)  ||
        !(personaRequest.telefono) ||
        !(personaRequest.cedula)  ||
        !(personaRequest.email) ||
        !(clave)
        ){
          ret = false;
      }
      return ret;
    }
    



    registroPersonaCargado(){
      try{
  
          const cedulapersonaregistrar =         (<HTMLInputElement>document.getElementById('cedula-persona-registrar')).value;
          const nombrepersonaregistrar =      (<HTMLInputElement>document.getElementById('nombre-persona-registrar')).value;
          const direccionpersonaregistrar =   (<HTMLInputElement>document.getElementById('direccion-persona-registrar')).value;
          const telefonpersonaregistrar =      (<HTMLInputElement>document.getElementById('telefono-persona-registrar')).value;
          const emailpersonaregistrar =       (<HTMLInputElement>document.getElementById('email-persona-registrar')).value;
          let clave =                         (<HTMLInputElement>document.getElementById('password-persona-registrar')).value;
  
          let personaRequest = {
            identidad:  0,
            nombre:     nombrepersonaregistrar,
            direccion:  direccionpersonaregistrar,
            telefono:   telefonpersonaregistrar,
            cedula:     cedulapersonaregistrar,
            email:      emailpersonaregistrar,
            activo:     false
          };
  
   
          if(this.validarPersonaRequest(personaRequest,clave)){
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
                persona:personaRequest
              } 
            }; 
  
            const token = this.seguridadService.getEncrypt(body);
            clave = '';        
            this.closeModalPersona();
            this.backendService.registrarPersona(body, token)
              .subscribe((response: GenericResponse) => {  
                if(response.error == 0){              
                  this.getPersonas();
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
}
