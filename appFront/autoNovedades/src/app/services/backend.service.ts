import { RolesXpersona } from './../interfaces/rolesxpersona';
import { Roles } from '../interfaces/rol.interface';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBody } from 'src/app/interfaces/request-body.interface';
import { Entidades } from '../interfaces/entidades.interface';
import { GenericResponse } from '../interfaces/genericresponse.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private token: string;

  constructor(private http: HttpClient) {
    this.token = "";
  }

  get headers() {
    return {
      headers: {
        'X-SESSION-TOKEN': this.token,
        'X-ORIGIN': 'ANG'
      }
    };
  }

  public getRoles(body: RequestBody, token: string): Observable<Roles> {
    this.token = token;
    const url = `${base_url}/v1/roles`;
    return this.http.post<Roles>(url, body, this.headers);
  }


  public validarLogin(body: any, token: string): Observable<RolesXpersona> {
    this.token = token;
    const url = `${base_url}/v1/token/validarlogin`;
    return this.http.post<RolesXpersona>(url, body, this.headers);
  }


  public getEntidades(body: RequestBody, token: string): Observable<Entidades> {
    this.token = token;
    const url = `${base_url}/v1/entidades`;
    return this.http.post<Entidades>(url, body, this.headers);
  }


  public editarEntidad(body: any, token: string): Observable<GenericResponse> {
    this.token = token;
    const url = `${base_url}/v1/entidades/actualizar/todo`;
    return this.http.post<GenericResponse>(url, body, this.headers);
  }


  public registrarEntidad(body: any, token: string): Observable<GenericResponse> {
    this.token = token;
    const url = `${base_url}/v1/entidades/actualizar/nuevo`;
    return this.http.post<GenericResponse>(url, body, this.headers);
  }
  
}
