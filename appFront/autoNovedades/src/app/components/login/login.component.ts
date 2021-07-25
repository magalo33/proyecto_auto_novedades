import { UtilitiesService } from './../../services/utilities.service';
import { RolesXpersona, RolXpersona } from './../../interfaces/rolesxpersona';
import { Rol, Roles } from '../../interfaces/rol.interface';
import { BackendService } from './../../services/backend.service';
import { SeguridadService } from './../../services/seguridad.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  idrol: number=0;
  cedula:string='';
  clave:string='';
  roles:Rol[];
  
  constructor(
    private seguridadService: SeguridadService,
    private backendService: BackendService,
    private router: Router,
    private utilitiesService: UtilitiesService) { 
      this.roles = new Array();
      this.getRoles();
    
  }

  ngOnInit(): void {
  }

  
  changeRol(){
    if(this.idrol>0){
      (<HTMLInputElement>document.getElementById('txtCedula')).disabled = false;
      (<HTMLInputElement>document.getElementById('txtPassword')).disabled = false;
    }else{
      (<HTMLInputElement>document.getElementById('txtCedula')).value = '';
      (<HTMLInputElement>document.getElementById('txtPassword')).value = '';
      (<HTMLInputElement>document.getElementById('txtCedula')).disabled = true;
      (<HTMLInputElement>document.getElementById('txtPassword')).disabled = true;
    }
  }

  getRoles(){
    try{
      const body = { data: { token: this.seguridadService.getToken() } };
      const token = this.seguridadService.getEncrypt(body);
      
      this.backendService.getRoles(body, token)
        .subscribe((resp: Roles) => {
          const error = resp.error;
          if(error == 0){
            this.roles = resp.roles;
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


  enviarBtn(){
    try{
      const body = { data: { requestLogin: { idrol: this.idrol,cedula: this.cedula,clave: this.seguridadService.getDataEncrypt( this.clave ) } } };      
      const token = this.seguridadService.getEncrypt(body);
      this.backendService.validarLogin(body, token)
        .subscribe((response: RolesXpersona) => {  
          if(response.error == 0){
              let arrayRolesxpersona:RolXpersona[] = response.rolesxpersona; 
              arrayRolesxpersona.forEach((rolXpersona:RolXpersona,indice)=>{
                if( indice == 0 ){
                  let persona = rolXpersona.persona;
                  let rol = rolXpersona.rol;
                  if(rol.descripcion == 'SUPER-ADMIN'){
                    this.router.navigate([`../super-admin`]);
                  }else{
                    if(rol.descripcion == 'ADMIN'){
                      this.utilitiesService.fail('PROCEDER CON ADMIN');
                    } 
                  }
                }
              });
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
    }
  




}
