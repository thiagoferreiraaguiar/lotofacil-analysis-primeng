import { UsuarioFTO } from './../fto/usuario-fto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlteraEmailService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public alterarEmail(usuarioFTO: UsuarioFTO) {
    return this.http.post(this.url + '/api/usuario/atualizarEmail', usuarioFTO);
  }
}
