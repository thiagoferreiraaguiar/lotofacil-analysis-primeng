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

  public pesquisarUsuario(nome: string, login: string, idPerfilUsuario: number, ativo: boolean) {
    const params = new HttpParams()
      .set('nome', nome)
      .set('login', login)
      .set('idPerfilUsuario', idPerfilUsuario.toString())
      .set('ativo', (ativo ? "true" : "false"));

    return this.http.get(this.url + '/api/usuario/pesquisarUsuario', { params });
  }
}
