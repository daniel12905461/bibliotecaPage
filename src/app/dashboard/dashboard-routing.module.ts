import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
import { DashboardComponent } from './dashboard.component';
import { ListAutorComponent } from './list-autor/list-autor.component';
import { ListCategoriaComponent } from './list-categoria/list-categoria.component';
import { ListLibroComponent } from './list-libro/list-libro.component';
import { PrestamoComponent } from './prestamo/prestamo.component';
import { ReporteLibrosComponent } from './reporte-libros/reporte-libros.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path:'findLibros',
        component:ReporteLibrosComponent
      },
      {
        path:'libros',
        component:ListLibroComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'autores',
        component:ListAutorComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'categorias',
        component:ListCategoriaComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'prestamos',
        component:PrestamoComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: 'findLibros'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
