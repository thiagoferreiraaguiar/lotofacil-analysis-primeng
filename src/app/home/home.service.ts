import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public pesquisarQuantidadeApostaNaoVerificadas() {
    return this.http.get(this.url + '/api/aposta/quantidadeApostaNaoVerificadas');
  }
  
}
