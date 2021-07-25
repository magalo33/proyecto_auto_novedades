import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }


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
}
