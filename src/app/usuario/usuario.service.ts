import { UsuarioFTO } from './../fto/usuario-fto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public listarTodos() {
    return this.http.get(this.url + "/api/usuario/");
  }

  public pesquisarUsuario(nome: string, login: string, idPerfilUsuario: number, ativo: any) {
    const params = new HttpParams()
      .set('nome', nome)
      .set('login', login)
      .set('idPerfilUsuario', idPerfilUsuario.toString())
      .set('ativo', (ativo == null ? '' : (ativo ? 'true' : 'false')));

    return this.http.get(this.url + '/api/usuario/pesquisarUsuario', { params });
  }

  public getUsuario(idUsuario: number) {
    return this.http.get(this.url + "/api/usuario/" + idUsuario);
  }

  public cadastrarUsuario(usuarioFTO: UsuarioFTO) {
    return this.http.post(this.url + "/api/usuario", usuarioFTO);
  }

  public excluirUsuario(idUsuario: number) {
    return this.http.delete(this.url + "/api/usuario/" + idUsuario);
  }
  
}
