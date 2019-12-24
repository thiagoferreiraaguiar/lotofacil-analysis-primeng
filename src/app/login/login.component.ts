import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CurrentUser } from './../model/current-user';
import { UsuarioLogado } from './../model/usuario-logado';
import { JwtAutenticationRequest } from './../model/jwt-autentication-request';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtAutenticationRequest: JwtAutenticationRequest = new JwtAutenticationRequest();
  usuarioLogado: UsuarioLogado;
  msgs: Message[] = [];
  showMsgErro: boolean;
  disabledButton: boolean;
  labelButton: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.jwtAutenticationRequest.login = "thiago.aguiar";
    this.jwtAutenticationRequest.senha = "123456";

    this.usuarioLogado = UsuarioLogado.getInstance();
    this.labelButton = "Logar";
    this.showMsgErro = false;
    this.disabledButton = false;
  }

  public efetuarLogin(form: NgForm): void {
    this.disabledButton = true;
    this.labelButton = "";
    this.loginService.efetuarLogin(form.value).subscribe((currentUser: CurrentUser) => {
      if (currentUser != null) {
        this.adicionarUsuarioSessao(currentUser);
        this.router.navigate(['/home']);
      } else {
        this.falhaLogin('Não foi possível efetuar o acesso, login ou senha inválidos. ');
      }
    }, err => {
      this.falhaLogin('Não foi possível efetuar o acesso, entre em contato com o administrador.');
    });
  }

  private falhaLogin(message: string): void {
    this.msgs = [];
    this.disabledButton = false;
    this.showMsgErro = true;
    this.labelButton = "Logar";
    this.msgs.push({ severity: 'error', summary: 'Erro: ', detail: message });
    this.usuarioLogado.usuario = null;
    this.usuarioLogado.token = null;
    this.usuarioLogado.exibeMenu.emit(false);
  }

  public adicionarUsuarioSessao(currentUser: CurrentUser): void {
    this.usuarioLogado.usuario = currentUser.usuario;
    this.usuarioLogado.token = currentUser.token;
    this.usuarioLogado.exibeMenu.emit(true);
  }

}
