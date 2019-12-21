import { UsuarioLogado } from './../model/usuario-logado';
import { ActivatedRouteSnapshot, Router, CanActivate, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    public usuarioLogado: UsuarioLogado;
    public pageLogin: string = "";

    constructor(private router: Router) {
        this.usuarioLogado = UsuarioLogado.getInstance();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.usuarioLogado.isLogado()) {
            return true;
        } else {
            this.router.navigate([this.pageLogin]);
            return false;
        }
    }
}
