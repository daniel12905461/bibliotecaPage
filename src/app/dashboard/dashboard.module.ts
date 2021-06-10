import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListLibroComponent } from './list-libro/list-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateLibroComponent } from './list-libro/create-libro/create-libro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwitchComponent } from './switch/switch.component';
import { ListAutorComponent } from './list-autor/list-autor.component';
import { CreateAutorComponent } from './list-autor/create-autor/create-autor.component';
import { ListCategoriaComponent } from './list-categoria/list-categoria.component';
import { CreateCategoriaComponent } from './list-categoria/create-categoria/create-categoria.component';
import { ReporteLibrosComponent } from './reporte-libros/reporte-libros.component';
import { SharedModule } from '../shared/shared.module';
import { PrestamoLibroComponent } from './prestamo-libro/prestamo-libro.component';
import { PrestamoComponent } from './prestamo/prestamo.component';
// import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    DashboardComponent, 
    ListLibroComponent, 
    CreateLibroComponent, 
    SwitchComponent, 
    ListAutorComponent, 
    CreateAutorComponent, 
    ListCategoriaComponent, 
    CreateCategoriaComponent, 
    ReporteLibrosComponent, PrestamoLibroComponent, PrestamoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
