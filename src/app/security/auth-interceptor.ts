import { Injectable } from '@angular/core';
import { UsuarioLogado } from './../model/usuario-logado';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    usuarioLogado: UsuarioLogado;

    constructor() {
        this.usuarioLogado = UsuarioLogado.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReaques: any;

        if (this.usuarioLogado.isLogado()) {
            authReaques = req.clone({
                setHeaders: {
                    'Authorization': this.usuarioLogado.token
                }
            });
            return next.handle(authReaques);
        } else {
            return next.handle(req);
        }
    }
}
