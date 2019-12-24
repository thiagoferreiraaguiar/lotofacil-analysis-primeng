import { JwtAutenticationRequest } from './../model/jwt-autentication-request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public efetuarLogin(jwtAutenticationRequest: JwtAutenticationRequest) {
    return this.http.post(this.url + '/api/auth', jwtAutenticationRequest);
  }
}
