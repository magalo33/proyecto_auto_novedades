import * as CryptoJS from 'crypto-js';

class Security {

    key: string;
    constructor() {
        this.key = process.env.KEY || "";
     }

    public getEncrypt(body: any): string {      
      body = JSON.stringify(body);
      return CryptoJS.AES.encrypt(body.trim(), this.key.trim()).toString();
    }

    getDeEncrypt(data:string) {
        return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data,  this.key, 
            {
                keySize: 128 / 8,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
              })));
      }

      getDeEncryptString(data:string) {
        return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data,  this.key, 
          {
              keySize: 128 / 8,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            }))
      }
  
  }
  
  export default Security;