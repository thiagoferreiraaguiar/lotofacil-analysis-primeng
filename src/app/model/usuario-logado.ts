import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioLogado {
    public static instance: UsuarioLogado = null;
    public usuario: Usuario;
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
        if (this.usuario == null) {
            return false;
        }
        return this.usuario.login != '';
    }
}
