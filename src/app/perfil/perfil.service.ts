import { PerfilUsuarioFTO } from './../fto/perfil-usuario-fto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public listarTodos() {
    return this.http.get(this.url + "/api/perfilUsuario/");
  }

  public pesquisarPerfilUsuario(sigla: string, descricao: string) {
    const params = new HttpParams()
      .set('sigla', sigla)
      .set('descricao', descricao);

    return this.http.get(this.url + '/api/perfilUsuario/pesquisarPerfilUsuario', { params });
  }

  public getPerfilUsuario(idPerfilUsuario: number) {
    return this.http.get(this.url + "/api/perfilUsuario/" + idPerfilUsuario);
  }

  public cadastrarPerfilUsuario(perfilUsuarioFTO: PerfilUsuarioFTO) {
    return this.http.post(this.url + "/api/perfilUsuario", perfilUsuarioFTO);
  }

  public excluirPerfilUsuario(idPerfilUsuario: number) {
    return this.http.delete(this.url + "/api/perfilUsuario/" + idPerfilUsuario);
  }
}
