import { SeguridadService } from './../../services/seguridad.service';
import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Entidades, EntidadInterface } from 'src/app/interfaces/entidades.interface';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  entidades:EntidadInterface[];
  constructor(
    private seguridadService: SeguridadService,
    private backendService: BackendService,
    private utilitiesService: UtilitiesService
    ) { 
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

}
