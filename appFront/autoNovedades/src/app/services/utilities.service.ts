import { Rol } from './../interfaces/rol.interface';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Roles } from '../interfaces/rol.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

idrol:number;
cedula:string;
roles:Rol[];

constructor() {
  this.idrol = 0;
  this.cedula = '';
  this.roles = new Array();
  }

/*Muestra un mensaje modal de error*/
fail(message: string): void{
  Swal.fire({
    imageUrl: './../../assets/images/error.png',
    imageWidth: 100,
    imageHeight: 100,
    html: '<p class="alertParagraph">'.concat(message).concat('</p>'),
    confirmButtonColor: '#EF3829',
    }).then((result:any) => {
      console.log(result);
    });
  }


setLogin(idrol:number,cedula:string):void{
  this.idrol = idrol;
  this.cedula = cedula;
}

getIdrol():number{
  return this.idrol;
}

getCedula():string{
  return this.cedula;
}

toTimestamp(strDate:string){
  var datum = Date.parse(strDate);
  return datum/1000;
}


setRoles(roles:Rol[]){
  this.roles = roles;
}

getRoles(){
  return this.roles;
}

}
