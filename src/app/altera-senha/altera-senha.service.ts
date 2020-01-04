import { UsuarioFTO } from './../fto/usuario-fto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlteraSenhaService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public alterarSenha(usuarioFTO: UsuarioFTO) {
    return this.http.post(this.url + '/api/usuario/atualizarSenha', usuarioFTO);
  }

}
