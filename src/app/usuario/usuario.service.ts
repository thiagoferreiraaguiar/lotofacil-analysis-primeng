import { HttpClient } from '@angular/common/http';
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
}
