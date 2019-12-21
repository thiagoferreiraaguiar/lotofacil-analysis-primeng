import { PerfilUsuario } from './perfil-usuario';

export class Usuario {
    public idUsuario: number;
    public perfilUsuario: PerfilUsuario;
    public nome: string;
    public cpf: string;
    public login: string;
    public senha: string;
    public email: string;
    public ativo: boolean;

    public constructor() {
    }
}
