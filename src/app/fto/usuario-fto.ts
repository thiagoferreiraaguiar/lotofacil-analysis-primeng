import { PerfilUsuarioFTO } from './perfil-usuario-fto';

export class UsuarioFTO {
    public idUsuario: number;
    public perfilUsuario: PerfilUsuarioFTO;
    public nome: string;
    public cpf: string;
    public login: string;
    public senha: string;
    public email: string;
    public ativo: boolean;

    public constructor() {
    }
}
