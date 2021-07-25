import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  private key = '1ASE93UDHagwts5374jdgetr56plkd75';

  constructor() { }

  public getToken(): string {
    return uuidv4();
  }

  public getEncrypt(body: any): string {
    body.expDate = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    body = JSON.stringify(body);
    return CryptoJS.AES.encrypt(body.trim(), this.key.trim()).toString();
  }


  public getDataEncrypt(data: string): string {
    return CryptoJS.AES.encrypt(data.trim(), this.key.trim()).toString();
  }

}
