import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { AuthGuardService } from './service/auth-guard.service';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
