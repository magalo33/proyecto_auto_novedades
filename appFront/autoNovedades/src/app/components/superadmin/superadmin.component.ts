import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  control:number=0;


  constructor() { }

  ngOnInit(): void {
  }



  cargarControl(controlParam:number){
    this.control = controlParam;
  }


}
