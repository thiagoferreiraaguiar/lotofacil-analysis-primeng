import { AuthGuard } from './security/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'src/app/login/login.module#LoginModule' },
  { path: 'home', loadChildren: 'src/app/home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'list-perfil', loadChildren: 'src/app/perfil/list-perfil/list-perfil.module#ListPerfilModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
