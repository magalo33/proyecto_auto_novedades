import { AdminComponent } from './components/admin/admin.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'super-admin', component:SuperadminComponent},
  {path:'admin', component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
