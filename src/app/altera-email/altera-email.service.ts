import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlteraEmailService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public alterarEmail(email: string, login: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('login', login);

    return null;
  }
}
