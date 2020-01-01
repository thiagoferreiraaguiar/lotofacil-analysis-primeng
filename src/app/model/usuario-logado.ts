import { UsuarioFTO } from './../fto/usuario-fto';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class UsuarioLogado {
    public static instance: UsuarioLogado = null;
    public usuarioFTO: UsuarioFTO;
    public token: string;
    public exibeMenu = new EventEmitter<boolean>();

    public constructor() {
        return UsuarioLogado.instance = UsuarioLogado.instance || this;
    }

    public static getInstance(): UsuarioLogado {
        if (this.instance == null) {
            this.instance = new UsuarioLogado();
        }
        return this.instance;
    }

    public isLogado(): boolean {
        if (this.usuarioFTO == null) {
            return false;
        }
        return this.usuarioFTO.login != '';
    }
}
