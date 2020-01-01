import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlteraSenhaService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public alterarSenha(senha: string, novaSenha: string, confirmaSenha: string, login: string) {
    const params = new HttpParams()
      .set('senha', senha)
      .set('novaSenha', novaSenha)
      .set('confirmaSenha', confirmaSenha)
      .set('login', login);

    return this.http.get(this.url + '/api/usuario/atualizarSenhaByLogin', { params });
  }

}
