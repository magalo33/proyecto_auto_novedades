import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { EntidadesComponent } from './components/entidades/entidades.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonasComponent } from './components/personas/personas.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuperadminComponent,
    EntidadesComponent,
    UsuariosComponent,
    PersonasComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
