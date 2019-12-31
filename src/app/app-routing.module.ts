import { AuthGuard } from './security/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'list-perfil', loadChildren: () => import('src/app/perfil/list-perfil/list-perfil.module').then(m => m.ListPerfilModule), canActivate: [AuthGuard] },
  { path: 'form-perfil', loadChildren: () => import('src/app/perfil/form-perfil/form-perfil.module').then(m => m.FormPerfilModule), canActivate: [AuthGuard] },
  { path: 'form-perfil/:id', loadChildren: () => import('src/app/perfil/form-perfil/form-perfil.module').then(m => m.FormPerfilModule), canActivate: [AuthGuard] },
  { path: 'list-usuario', loadChildren: () => import('src/app/usuario/list-usuario/list-usuario.module').then(m => m.ListUsuarioModule), canActivate: [AuthGuard] },
  { path: 'altera-email', loadChildren: () => import('src/app/altera-email/altera-email.module').then(m => m.AlteraEmailModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
